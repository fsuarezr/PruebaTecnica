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

    getWeightOnPlanet(planetId){
        throw new Error('To be implemented');
    }
}

module.exports = AbstractPeople