const WookieePeople = require('./wookieePeople.js');
const CommonPeople = require('./CommonPeople');

const peopleFactory = async (id, isWookie, app) => {
    let people = null;
    if (isWookie) people = new WookieePeople(id, app);
    else people = new CommonPeople(id, app);
    
    await people.init();
    return people;
}

module.exports = { peopleFactory }