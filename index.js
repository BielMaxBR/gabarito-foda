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

    socket.on('updateAlternativa', (materia, alternativa) => {
        client.hset("gabarito", `${materia}`, `${alternativa}`)
        io.emit("updateAlternativa", materia, alternativa)
    }) 
})

io.listen(process.env.PORT || 4000)

console.log('iniciado')