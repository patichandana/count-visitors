const fastify = require("fastify")({
    logger: true
});
const {visits} = require("./scripts/visits")


fastify.get('/visits/:username', visits);

fastify.listen({port: 3000}, (err, address) => {
    if(err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
