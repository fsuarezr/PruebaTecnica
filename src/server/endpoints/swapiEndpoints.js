const db = require("@app/db")
const { swapiUrl } = require('@config')

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest(swapiUrl, 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const isWookie = _isWookieeFormat(req)
        const peopleId = req.params.id

        const data = await app.people.peopleFactory(peopleId,isWookie, app)

        res.send({
            name: data.getName(),
            height: data.getHeight(),
            mass: data.getMass(),
            homeworldName: data.getHomeworldName(),
            homeworldId: data.getHomeworlId(),
        });
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const planetId = req.params.id

        const data = await app.planet.planetFactory(planetId, app)

        res.send({
            name: data.getName(),
            gravity: data.getGravity()
        });

    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        const peopleId = Math.floor(Math.random() * 82) + 1
        const planetId = Math.floor(Math.random() * 60) + 1

        const people = await app.people.peopleFactory(peopleId,false, app)

        const planet = await app.planet.planetFactory(planetId, app)

        const weightCharacter = await people.getWeightOnPlanet(planetId, planet.gravity)

        res.send({
            peopleId,
            name: people.getName(),
            planetId,
            planetName: planet.name,
            weightCharacter
        });
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;