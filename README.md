TV Listings API client for node.js
==================================

[tv-listings](https://github.com/incrediblemolk/node-tv-listings) is a node.js [TV Media](https://tvmedia.3scale.net/) api wrapper.  It provides access to TV listings for various cable and broadcast networks across the United States and Canada.

## Requirements ##

- API Key from [TV Media](https://tvmedia.3scale.net/) (free)

NOTE: The TV Media API limits usage to 500 queries per key per month.  You can retrieve complete TV listings for multiple days in a single query, so this is not necessarily an issue.  You'll just want to build your app with the mindset of retrieving a large dataset once and running sub-queries without going back to the API.

## Installation ##

```
npm install node-tv-listings
```

## Methods ##

- getLineups: Available lineups (providers) for a specific postal/zip code.
- getLineup: Channel information for a specific lineup.
- getListings: TV listings for a particular lineup grouped by channel.
- getListingsChrono: TV listings for a particular lineup in chronological order.
- getStation: Information on a specific station (channel) including logo.
- getStationListings: TV listings for a particular station (channel).

NOTE: The methods that retrieve TV listings can take some time to respond, depending on how large the result set is.  I've noticed some issues requesting 3 or more days of listings across all channels in one query, but up to 2 days seems reliable.

NOTE: Every cable provider is not included, for example I've noticed Comcast and Fios are not listed while DirecTV and Dish are.  I have Fios and use the Dish results.  I'm sure there could be a few minor channel differences, but for widely broadcasted channels/shows it works fine.

## Usage ##

Tutorial available <a href="http://www.incrediblemolk.com/accessing-tv-listings-from-node-js/" target="_blank">here</a>.

```javascript

import TVListings from "node-tv-listings";
var tv = new tvAPI({
    apiKey: process.env.YOUR_TVMEDIA_KEY
});

tv.getLineups({ postalCode: "20001"}, function(err, results) {
    console.log(results);
});

tv.getLineup({ lineupID: "6076D" }, function(err, results) {
    console.log(results);
});

tv.getListings({ lineupID: "6076D", start: moment().format(), end: moment().add(1, 'days').format() }, function(err, results) {
    console.log(results);
});

tv.getListingsChrono({ lineupID: "6076D", sportEventsOnly: "true" }, function(err, results) {
    console.log(results);
});

tv.getStation({ stationID: "668" }, function(err, results) {
    console.log(results);    
});

tv.getStationListings({ stationID: "668" }, function(err, results) {
    console.log(results);
});

```

## Sample Show Listing ##
```javascript
{
  "seriesID": 136977,
  "seriesName": "Breaking Bad",
  "showType": "Drama",
  "description": "Mild-mannered high school chemistry teacher Walter White thinks his life can't get much worse. His salary barely makes ends meet, a situation not likely to improve once his pregnant wife gives birth, and their teenage son is battling cerebral palsy. But Walter is dumbstruck when he learns he has terminal cancer. Realizing that his illness probably will ruin his family financially, Walter makes a desperate bid to earn as much money as he can in the time he has left by turning an old RV into a meth lab on wheels.",
  "usualDuration": 0,
  "rating": "",
  "originatingNetwork": "",
  "language": "E",
  "stereo": false,
  "educational": false,
  "startYear": "",
  "endYear": "",
  "productionEnded": false,
  "twitter": "",
  "imdbID": "",
  "seasons": [
    {
      "seasonNumber": 2,
      "seasonID": 13330,
      "seasonDescription": "2009",
      "actors": "",
      "showName": "",
      "showType": ""
    }
  ],
  "episodes": [
    {
      "seriesID": 136977,
      "episodeID": 836963,
      "seasonID": 13330,
      "showTitle": "Bit by a Dead Bee",
      "showTitleSort": "",
      "alternateTitle": "",
      "description": "Walt and Jesse's financial situations suffer when they try to cover their tracks; the DEA has a break in its meth investigation that could lead right to Walt and Jesse.",
      "showType": "",
      "educational": false,
      "subtitled": false,
      "seriesSeqNo": 10,
      "seasonSeqNo": 3,
      "actors": "",
      "airdate": "2009-03-22 00:00:00",
      "seriesName": "Breaking Bad",
      "externalIds": []
    }
  ],
  "externalIds": []
} 
```

## Sample Sports Listing ##
```javascript
{
  "seriesID": 33461,
  "seriesName": "Football",
  "showType": "Sports, Football",
  "description": "Football.",
  "usualDuration": 180,
  "rating": "TV14",
  "originatingNetwork": "",
  "language": "E",
  "stereo": true,
  "educational": false,
  "startYear": "",
  "endYear": "",
  "productionEnded": false,
  "twitter": "",
  "imdbID": "",
  "seasons": [],
  "episodes": [
    {
      "seriesID": 33461,
      "episodeID": 101486,
      "seasonID": 0,
      "showTitle": "",
      "showTitleSort": "",
      "alternateTitle": "",
      "description": "",
      "showType": "Football",
      "educational": false,
      "subtitled": false,
      "seriesSeqNo": 0,
      "seasonSeqNo": 0,
      "actors": "",
      "airdate": "",
      "seriesName": "Football",
      "externalIds": []
    }
  ],
  "externalIds": []
}
```