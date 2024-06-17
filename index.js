import Fastify  from "fastify";
import {visits} from "./scripts/visits.js";
import { CONFIG } from "./config.js";

const fastify = Fastify({
    logger: true
})

fastify.get('/visits/:username', visits);

fastify.listen({port: CONFIG.PORT}, (err, address) => {
    if(err) {
        fastify.log.error(err)
        process.exit(1)
    } 
    console.log(`listening to port ${CONFIG.PORT}`)
})
