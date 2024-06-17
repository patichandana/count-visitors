//what about concurrency?
// const { readFile, writeFile } = require("node:fs/promises");
const fsPromises = require("node:fs/promises");
const fs = require("node:fs")
const {prepareSVG} = require("./prepareSVG");

const visits = async (request, reply) => {
    const filepath = "resources/" + request.params.username;
    try {
        await fsPromises.access(filepath, fs.constants.W_OK | fs.constants.R_OK);
        const data = await fsPromises.readFile(filepath, { encoding: 'utf-8' })
        const counter = Number(data) + 1;
        await fsPromises.writeFile(filepath, '' + counter)
        const image = await prepareSVG(counter);
        reply.send(image);
    }catch (err) {
        if(err?.code == "ENOENT") {
            await fsPromises.writeFile(filepath, "1");
            const image = await prepareSVG("1");
            reply.send(image);
        } else {
            reply.send("error fetching the count")
        }
    }
}

module.exports = { visits: visits }
