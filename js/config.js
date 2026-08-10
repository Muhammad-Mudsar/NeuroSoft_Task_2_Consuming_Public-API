//config.js    API configuration

/** Application Configuration */

//attempt=1
// const CONFIG = Object.freeze({
//   BASE_URL: "https://api.sampleapis.com/movies",

//   DEFAULT_CATEGORY: "classic",

//   REQUEST_TIMEOUT: 10000,
// });
//If we ever change the API, we only update this file.

// const CONFIG = Object.freeze({
//   BASE_URL: "https://api4devs.com/api/v1",

//   DEFAULT_CATEGORY: "popular",

//   REQUEST_TIMEOUT: 10000,

//   ITEMS_PER_PAGE: 20,
// });

const CONFIG = Object.freeze({
  BASE_URL: "https://api.tvmaze.com",
  REQUEST_TIMEOUT: 10000,
  DEFAULT_ENDPOINT: "/shows",
  DEFAULT_PAGE: 0,
});

//MovieAPI.getShows()
