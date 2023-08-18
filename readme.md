# VRChat World Scraper

`pnpm i github:phaze-the-dumb/vrchat-world-scraper`

Currently Implemented Scrapers:
- 0 - [https://vrclist.com](https://vrclist.com)
- 1 - [https://en.vrcw.net](https://en.vrcw.net)

**Notes:**
- VRCList doesn't always return visits correctly and it doesn't fetch the world size
- VRCW doesn't return the world authors id
- The VRCList scraper has a faster response time **but** it uses more http requests than VRCW

```js
const worlds = require('vrchat-world-scraper');

worlds.find("wrld_05147ea0-fcb5-4a21-84d8-4174a30c2650").then(console.log); // Looks for the world on VRCList then if its not there checks VRCW, If no world is found it returns null

// You can specify the scraper to use in this function  vvv
worlds.find("wrld_05147ea0-fcb5-4a21-84d8-4174a30c2650", 1).then(console.log); // Only checks VRCW
```

## Why?

I needed a way of fetching world data without having to authenticate to vrchats servers.