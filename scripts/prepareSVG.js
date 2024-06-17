import fsPromises from "node:fs/promises";
const templatePromise = fsPromises.readFile("resources/StandardTemplate.svg", { encoding: 'utf-8' });

const prepareSVG = async (visits) => {
    const template = await templatePromise;
    return template.replace("siteVisitorsCount", visits)
}

export { prepareSVG };