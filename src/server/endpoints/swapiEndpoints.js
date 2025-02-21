const db = require("@app/db")
const { swapiUrl } = require('@config')
const validateId = require('@server/middlewares/validateIdMiddleware')

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

    server.get('/hfswapi/getPeople/:id', validateId, async (req, res) => {
        console.log(' ')
        console.log('==================')
        console.log(`Inicia consulta de Personaje con id:${req.params.id}`)

        try {

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
            })
        } catch (error) {
            console.log(`Termina consulta de Personaje con error:${error.message}, armando respuesta de servicio`)
            console.log('==================')
            console.log(' ')
            res.send({ messageError: error.message })
        }

    });

    server.get('/hfswapi/getPlanet/:id', validateId, async (req, res) => {
        console.log(' ')
        console.log('==================')
        console.log(`Inicia consulta de Planeta con id:${req.params.id}`)

        try {

            const planetId = req.params.id

            const data = await app.planet.planetFactory(planetId, app)

            console.log(`Termina consulta de Planeta con id:${req.params.id}, armando respuesta de servicio`)
            console.log('==================')
            console.log(' ')

            res.send({
                name: data.getName(),
                gravity: data.getGravity()
            })

        } catch (error) {
            console.log(`Termina consulta de Planeta con error:${error.message}, armando respuesta de servicio`)
            console.log('==================')
            console.log(' ')
            res.send({ messageError: error.message })
        }


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

            const [planet, people] = await Promise.all([
                app.planet.planetFactory(planetId, app),
                app.people.peopleFactory(peopleId, false, app)
            ]);
    
            console.log(`Calculando el peso de: ${people.getName()} en planeta: ${planet.getName()}`)
    
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
            console.log(`Termina consulta de peso de un personaje con error:${error.message}, armando respuesta de servicio`)
            console.log('==================')
            console.log(' ')
            res.send({ messageError: error.message })
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

    server.get('/hfswapi/seedDatabase', async (req, res) => {
        try {
            console.log(' ');
            console.log('==================');
            console.log('Inicia población de data en BD');

            const createPeoplePromises = Array.from({ length: 5 }, (_, i) => i + 1)
                .map(async i => {
                    const people = await app.people.peopleFactory(i, false, app);
                    return {
                        name: people.getName(),
                        height: people.getHeight(),
                        mass: people.getMass(),
                        homeworld_name: people.getHomeworldName(),
                        homeworld_id: people.getHomeworlId()
                    };
                });

            const createPlanetPromises = Array.from({ length: 4 }, (_, i) => i + 1)
                .map(async i => {
                    const planet = await app.planet.planetFactory(i, app);
                    return {
                        name: planet.getName(),
                        gravity: planet.getGravity()
                    };
                });

            const [createdPeople, createdPlanets] = await Promise.all([
                Promise.all(createPeoplePromises),
                Promise.all(createPlanetPromises)
            ]);

            await Promise.all(createdPeople.map(data => app.db.swPeople.create(data)));
            await Promise.all(createdPlanets.map(data => app.db.swPlanet.create(data)));

            console.log(' ');
            console.log('Termina la consulta, armando respuesta de servicio');
            console.log('==================');
            console.log(' ');

            res.send({ message: 'Database seeded' });

        } catch (error) {
            console.log(`Termina consulta de peso de un personaje con error:${error.message}, armando respuesta de servicio`)
            console.log('==================')
            console.log(' ')
            res.send({ messageError: error.message })
        }

    });

}

module.exports = applySwapiEndpoints;