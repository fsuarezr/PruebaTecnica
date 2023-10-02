const { swapiUrl } = require('@config')

class Planet {
    constructor(id, app){
        this.id = id
        this.app = app
    }

    async init(){
        let planet = await this.app.db.swPlanet.findOne({
            where: {id:this.id}
        })

        if(!planet) planet = await this.app.swapiFunctions.genericRequest(`${swapiUrl}/planets/${this.id}`,'GET',null)

        this.gravity = this.calculateGravity(planet.gravity)
        this.name = planet.name
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }

    calculateGravity(gravity) {

        if(["N/A", "unknown"].includes(gravity)) return "Gravedad desconocida"

        const gravityStandar = 9.8
        const regex = /(\d+(\.\d+)?)/;
        const matches = gravity.match(regex)
        
        return (gravityStandar/ parseFloat(matches[0])).toFixed(2)
    }
}

module.exports = Planet