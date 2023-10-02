const AbstractPeople = require('./abstractPeople')
const { swapiUrl } = require('@config')

class CommonPeople extends AbstractPeople { 
    constructor(id,app){
        super(id,app)
    }

    async init() {
        let people = await this.app.db.swPeople.findOne({
            where: {id: this.id}
        })

        if(!people) people = await this.app.swapiFunctions.genericRequest(`${swapiUrl}/people/${this.id}`,'GET',null)

        const world = await this.app.swapiFunctions.genericRequest( people.homeworld, "GET", null)

        this.name = people.name
        this.height = people.height
        this.mass = people.mass
        this.homeworlId = people.homeworld.split('/').filter(Boolean).pop()
        this.homeworldName = world.name
    }
}

module.exports = CommonPeople