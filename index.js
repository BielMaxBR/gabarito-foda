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
        socket.emit('init', value)
    })
    console.log('alguem conectou')
})

io.listen(process.env.PORT || 4000)

console.log('iniciado')