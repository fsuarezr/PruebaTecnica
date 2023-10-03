const { swapiUrl } = require('@config')

class Planet {
    constructor(id, app){
        this.id = id
        this.app = app
    }

    async init(){
        console.log(`Inicia consulta a la base de datos`)
        let gravity
        let planet = await this.app.db.swPlanet.findOne({
            where: {id:this.id}
        })

        console.log(`Existe data en BD:${planet}`)

        if(!planet) {
            console.log(`Inicia consulta a la API de SWAPI para obtener el Planeta de Star Wars`)
            planet = await this.app.swapiFunctions.genericRequest(`${swapiUrl}/planets/${this.id}`,'GET',null)

            console.log(`Calculando la gravedad del planeta:${planet.name}, con gravedad: ${planet.gravity}`)
            gravity = this.calculateGravity(planet.gravity)
        } else {
            planet = planet.dataValues
            gravity = planet.gravity
        }

        this.gravity = gravity
        this.name = planet.name
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }

    calculateGravity(gravity) {

        if(["N/A", "unknown"].includes(gravity)) return "Unknown gravity"

        const gravityStandar = 9.8
        const regex = /(\d+(\.\d+)?)/;
        const gravityPlanet = gravity.match(regex)
        
        return (gravityStandar/ parseFloat(gravityPlanet[0])).toFixed(2)
    }
}

module.exports = Planet