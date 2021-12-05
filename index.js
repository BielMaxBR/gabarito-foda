import { Server } from "socket.io";
import client from "./redis_client.js";
const io = new Server({
    cors: {
        allowedHeaders: ['Access-Control-Allow-Origin'],
        methods: ["GET", "POST"]
    }
})
io.on('connection', socket => {
    client.hgetall("gabarito", (err, value) => {
        client.hgetall("materias", (err, value2) => {
            socket.emit('init', value, value2)
        })
    })
    console.log('alguem conectou')

    socket.on('updateAlternativa', (questao, alternativa) => {
        client.hset("gabarito", `${questao}`, `${alternativa}`)
        io.emit("updateAlternativa", questao, alternativa)
    }) 
    socket.on('updateMateria', (questao, materia) => {
        client.hset("materias", `${questao}`, `${materia}`)
        io.emit("updateMateria", questao, materia)
    }) 
    socket.on('download', _ => {
        client.hgetall("gabarito", (err, value) => {
            client.hgetall("materias", (err, value2) => {
                let texto = ''
                for (const question of Object.keys(value)) {
                    if (value2[question] != '') {
                        texto += "\n - " + value2[question] + " -\n\n"
                    }
                    texto += `${question}_` + value[question].toUpperCase() + "\n"
                }
                socket.emit('download', texto)
            })
        })
    })
})

io.listen(process.env.PORT || 4000)

console.log('iniciado')