const Planet = require('./Planet');

const planetFactory = async (id, app) => {
   const planet = new Planet(id, app)

   await planet.init()

   return planet
}

module.exports = { planetFactory }