const fetch = require('node-fetch');
const World = require('./world');

const ENDPOINT = 'https://api.vrclist.com/';

let find = ( worldID ) => {
  return new Promise(async (reso, rej) => {
    let fixedIDReq = await fetch(ENDPOINT + 'worlds/id-convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        world_id: worldID
      })
    })

    let fixedID = await fixedIDReq.text()

    if(fixedID == "")
      return reso(null);

    fixedID = JSON.parse(fixedID);

    let worldReq = await fetch(ENDPOINT + 'worlds/single', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: fixedID.id
      })
    });

    let w = await worldReq.json();

    let world = new World();

    world.id = worldID;
    world.name = w.name;
    world.author = w.authorName;
    world.authorId = w.authorId;
    world.desc = w.description;
    world.img = w.imageUrl;
    world.maxUsers = parseInt(w.capacity);
    world.size = 'Cannot find world size';
    world.visits = parseInt(w.vrchat_visits) || "Cannot find world visits";
    world.favourites = parseInt(w.vrchat_faves);
    world.tags = JSON.parse(w.tags);
    world.from = 'https://vrclist.com/worlds/' + fixedID.id;
    world.fromSite = 'vrclist.com';

    reso(world);
  });
}

module.exports = { find };