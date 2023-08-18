const fetch = require('node-fetch');
const cheerio = require('cheerio');
const World = require('./world');

const ENDPOINT = 'https://en.vrcw.net/world/detail/';

let find = ( worldID ) => {
  return new Promise(async (reso, rej) => {
    let req = await fetch( ENDPOINT + worldID );
    let res = await req.text();

    if(req.url !== ENDPOINT + worldID)
      return reso(null);

    let world = new World();
    let $ = cheerio.load(res);

    let tags = [];
    $('dd.col-xs-12:nth-child(18) > div:nth-child(1) > div').each(( i, el ) => {
      tags.push($(el).text().trim());
    });

    world.id = worldID;
    world.name = $('#world > h2:nth-child(8)').text();
    world.author = $('dd.col-xs-12:nth-child(4) > a:nth-child(1)').text().trim();
    world.authorId = 'Cannot find author ID';
    world.desc = $('div.row:nth-child(10) > div:nth-child(1) > dl:nth-child(1) > dd:nth-child(2)').text().trim();
    world.img = $('.col-sm-5 > img:nth-child(1)').attr().src;
    world.maxUsers = parseInt($("dd.col-xs-12:nth-child(6)").text());
    world.size = $('dd.col-xs-12:nth-child(8)').text().trim();
    world.visits = parseInt($("dd.col-xs-12:nth-child(10)").text());
    world.favourites = parseInt($("dd.col-xs-12:nth-child(12)").text());
    world.tags = tags;
    world.from = ENDPOINT + worldID;
    world.fromSite = 'vrcw.net';

    reso(world);
  })
}

module.exports = { find };