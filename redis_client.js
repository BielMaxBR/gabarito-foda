import { createClient } from 'redis';
import dotenv from "dotenv"
dotenv.config()

const client = createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

client.on('ready', () => {
    console.log('redis conectado')
    client.del("gabarito")
    client.del("materias")
    for(let question = 1; question < 91; question++) {
        client.hset("gabarito", `${question}`, "")
        client.hset("materias", `${question}`, "")
    }
})

export default client