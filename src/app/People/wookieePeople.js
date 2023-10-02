const AbstractPeople = require('./abstractPeople')
const { swapiUrl } = require('@config')
class WookieePeople extends AbstractPeople {
    constructor(id, app) {
        super(id, app)
    }

    async init() {
        console.log(`Inicia consulta a la base de datos`)
        let people = await this.app.db.swPeople.findOne({
            where: { id: this.id }
        })

        console.log(`Existe data en BD:${people}`)

        if (!people) {
            console.log(`Inicia consulta a la API de SWAPI para obtener personaje de Star Wars en leguaje WOOKIE`)
            people = await this.app.swapiFunctions.genericRequest(`${swapiUrl}/people/${this.id}/?format=wookiee`, 'GET', null)
        }

        console.log(`Inicia consulta a la API de SWAPI para obtener el planeta al que pertenece el personaje de Star Wars en lenguaje WOOKIE`)
        const planetId = people.acooscwoohoorcanwa.split('/').filter(Boolean).pop()
        const world = await this.app.swapiFunctions.genericRequest(`${swapiUrl}/people/${planetId}/?format=wookiee`, "GET", null)

        this.whrascwo = people.whrascwo
        this.acwoahrracao = people.acwoahrracao
        this.scracc = people.scracc
        this.acooscwoohoorcanwa = planetId
        this.whrascwoPlanet = world.whrascwo
    }
}

module.exports = WookieePeople