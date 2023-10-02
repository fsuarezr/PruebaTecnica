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
        
        if(this.homeworlId === planetId) return "You're trying to calculate the weight of a Character on their same planet"

        if(!isNaN(parseFloat(planetGravity)) && isFinite(planetGravity)) return "Can not calculate the weight of the character on the planet because the gravity of that planet is unknow"

        const weightCharacter = planetGravity * this.getMass
        
        return weightCharacter
    }
}

module.exports = AbstractPeople