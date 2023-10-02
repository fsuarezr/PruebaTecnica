class AbstractPeople {

    constructor(id, app) {
        this.id = id
        this.app = app

        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
        throw new Error('To be implemented');
    }

    getId() {
       return this.id
    }

    getName() {
        return this.name || this.whrascwo
    }

    getMass() {
        return this.mass || this.scracc
    }

    getHeight() {
        return this.height || this.acwoahrracao
    }

    getHomeworldName() {
        return this.homeworldName || this.whrascwoPlanet
    }

    getHomeworlId() {
        return this.homeworlId || this.acooscwoohoorcanwa
    }

    getWeightOnPlanet(planetId, planetGravity){

        if(+this.getHomeworlId() === planetId) throw new Error("You're trying to calculate the weight of a Character on their home planet")

        if(isNaN(parseFloat(planetGravity))) throw new Error(`Can not calculate the weight of the character on the planet because the gravity of that planetId: ${planetId} is unknown`)

        const weightCharacter = planetGravity * this.getMass()
        
        return weightCharacter
    }
}

module.exports = AbstractPeople