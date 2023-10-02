const db = require("@app/db")
const { swapiUrl } = require('@config')

const _isWookieeFormat = (req) => {
    if (req.query.format && req.query.format == 'wookiee') {
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
        console.log(' ')
        console.log('==================')
        console.log(`Inicia consulta de Personaje con id:${req.params.id}`)

        const isWookie = _isWookieeFormat(req)
        const peopleId = req.params.id

        console.log(`La consulta está en lenguaje wookie:${isWookie}`)

        const data = await app.people.peopleFactory(peopleId, isWookie, app)

        console.log(`Termina consulta de Personaje con id:${req.params.id}, armando respuesta de servicio`)
        console.log('==================')
        console.log(' ')

        res.send({
            name: data.getName(),
            height: data.getHeight(),
            mass: data.getMass(),
            homeworldName: data.getHomeworldName(),
            homeworldId: data.getHomeworlId(),
        });
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        console.log(' ')
        console.log('==================')
        console.log(`Inicia consulta de Planeta con id:${req.params.id}`)

        const planetId = req.params.id

        const data = await app.planet.planetFactory(planetId, app)

        console.log(`Termina consulta de Planeta con id:${req.params.id}, armando respuesta de servicio`)
        console.log('==================')
        console.log(' ')

        res.send({
            name: data.getName(),
            gravity: data.getGravity()
        });

    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        console.log(' ')
        console.log('==================')
        console.log(`Inicia consulta aleatoria del peso de un personaje en algún planeta de la franquicia`)
        try {
            const peopleId = Math.floor(Math.random() * 82) + 1
            const planetId = Math.floor(Math.random() * 60) + 1

            console.log(`Id de personaje aleatorio: ${peopleId}`)
            console.log(`Id de planeta aleatorio: ${planetId}`)

            const planet = await app.planet.planetFactory(planetId, app)
            const people = await app.people.peopleFactory(peopleId, false, app)

            console.log(`Calculando el peso de: ${people.getName()} en planeta: ${planet.getName()} `)

            const weightCharacter = await people.getWeightOnPlanet(planetId, planet.gravity)

            console.log(`Termina la consulta, armando respuesta de servicio`)
            console.log('==================')
            console.log(' ')

            res.send({
                peopleId,
                name: people.getName(),
                planetId,
                planetName: planet.name,
                weightCharacter
            })

        } catch (error) {
            res.send({messageError: error.message})
        }

    });

    server.get('/hfswapi/getLogs', async (req, res) => {
        console.log(' ')
        console.log('==================')
        console.log(`Inicia obtención de logs en BD`)

        const data = await app.db.logging.findAll();

        console.log(`Termina la consulta, armando respuesta de servicio`)
        console.log('==================')
        console.log(' ')

        res.send(data);
    });

}

module.exports = applySwapiEndpoints;