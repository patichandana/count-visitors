const fsPromises = require("node:fs/promises")

const prepareSVG = async (visits) => {
    try {
        const template = await fsPromises.readFile("resources/StandardTemplate.svg", { encoding: 'utf-8' });
        const modifedTemplate = template.replace("siteVisitorsCount", visits)
        await fsPromises.writeFile("resources/ModifiedTemplate.svg", modifedTemplate);
        return modifedTemplate;
    } catch(err) {
        throw new Error("svg_failure");
    }
}

module.exports = {prepareSVG: prepareSVG}