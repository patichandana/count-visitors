const fastify = require("fastify")({
    logger: true
});
const {visits} = require("./scripts/visits");
const { CONFIG } = require("./config.js")

fastify.get('/visits/:username', visits);

fastify.listen({port: CONFIG.PORT}, (err, address) => {
    if(err) {
        fastify.log.error(err)
        process.exit(1)
    } 
    console.log(`listening to port ${CONFIG.PORT}`)
})
