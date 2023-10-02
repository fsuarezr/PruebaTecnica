const AbstractPeople = require('./abstractPeople')
const { swapiUrl } = require('@config')
class WookieePeople extends AbstractPeople {
    constructor(id, app) {
        super(id, app)
    }

    async init() {
        let people = await this.app.db.swPeople.findOne({
            where: { id: this.id }
        })

        if (!people) people = await this.app.swapiFunctions.genericRequest(`${swapiUrl}/people/${this.id}/?format=wookiee`, 'GET', null)

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