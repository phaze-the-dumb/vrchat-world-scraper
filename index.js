let scrapers = [ require('./lib/vrclist-scraper.js'), require('./lib/vrcw-scraper.js') ];

let find = async ( worldID, scraper ) => {
  if(!scraper){
    let world;

    for(let scraper of scrapers) {
      world = scraper.find(worldID);
      if(!world) continue;

      break;
    }

    return world;
  } else
    return scrapers[scraper].find(worldID);
}

module.exports = { find };
