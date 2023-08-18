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

find("wrld_05147ea0-fcb5-4a21-84d8-4174a30c2650", 0).then(console.log);

module.exports = { find };