/*
  BeCurrent Power-Up environment config

  Keep ALL environment-specific values (URLs, keys, names) in THIS ONE FILE.
  For dev/stage/prod, duplicate the whole power-up folder and ONLY edit config.js.

  Usage (any page/script):
    const { APP_KEY, PU_BASE, V } = window.BC;
*/

window.BECURRENT_CONFIG = Object.freeze({
  // Trello Power-Up credentials
  APP_KEY: "06d29ef207dfaed1d7e3feba0323b561",
  APP_NAME: "Verb-Starter Checker",
  APP_AUTHOR: "Trav Coan",

  // Where this Power-Up is hosted (used to build iframe URLs)
  PU_BASE: "https://travisdcoan.github.io/mtc-trello-ai-assist-dev/",

  // Cache buster used in iframe URLs (bump on releases)
  V: "2025-11-12",

  // External services
  AI_URL: "https://askyeti.co/api/goal/be-current",

  // If AskYeti requires auth, set a bearer token here.
  // NOTE: This file is served to the browser, so anything here is visible to users who can load the Power-Up.
  AI_BEARER_TOKEN: "1|deQt6ds35tLywbhCvT9iljkPuNnhrDdUdrwkQWh4fbe0b115"
});

// Short alias used throughout the codebase
window.BC = window.BECURRENT_CONFIG;
