const fsPromises = require("node:fs/promises");
const fs = require("node:fs")
const path = require("node:path");

const { prepareSVG } = require("./prepareSVG");
const { CONFIG } = require("../config.js")

const visits = async (request, reply) => {
    const username = request.params.username;
    const filepath = path.join(CONFIG.COUNTER_FILES_DIR, request.params.username)
    const validateUserNameRegex = /^[a-zA-Z0-9-]+$/; //regex to accept strings that contain alphanumberic characteres, and hyphen

    if (!validateUserNameRegex.test(username)) {
        reply.send("enter valid username").code("400")
        return;
    }

    try {
        await fsPromises.access(filepath, fs.constants.W_OK | fs.constants.R_OK);
    } catch (err) {
        if (err?.code == "ENOENT") {
            await fsPromises.mkdir(CONFIG.COUNTER_FILES_DIR, { recursive: true });
            await fsPromises.writeFile(filepath, "0");
        }
    }

    try {
        const data = await fsPromises.readFile(filepath, { encoding: 'utf-8' })
        const counter = Number(data) + 1;
        await fsPromises.writeFile(filepath, '' + counter)
        const image = await prepareSVG(counter);
        reply.send(image);
    } catch (err) {
        reply.send("failed to fetch the count").code(500);
    }
}

module.exports = { visits: visits }
