const AbstractPeople = require('./abstractPeople')
const { swapiUrl } = require('@config')

class CommonPeople extends AbstractPeople { 
    constructor(id,app){
        super(id,app)
    }

    async init() {
        console.log(`Inicia consulta a la base de datos`)
        let people = await this.app.db.swPeople.findOne({
            where: {id: this.id}
        })

        console.log(`Existe data en BD:${people}`)

        if(!people) {
            console.log(`Inicia consulta a la API de SWAPI para obtener personaje de Star Wars`)
            people = await this.app.swapiFunctions.genericRequest(`${swapiUrl}/people/${this.id}`,'GET',null)
        }

        console.log(`Inicia consulta a la API de SWAPI para obtener el planeta al que pertenece el personaje de Star Wars`)
        const world = await this.app.swapiFunctions.genericRequest( people.homeworld, "GET", null)

        this.name = people.name
        this.height = people.height
        this.mass = people.mass
        this.homeworlId = people.homeworld.split('/').filter(Boolean).pop()
        this.homeworldName = world.name
    }
}

module.exports = CommonPeople