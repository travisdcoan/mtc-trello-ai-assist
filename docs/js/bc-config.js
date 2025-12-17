/* BeCurrent Power-Up shared config
   - Put keys, base URLs, and version strings here.
   - All pages read window.BC_CONFIG.
*/
(function () {
  'use strict';

  // Change this once per release to force Trello iframe reloads (main.js appends ?v=...)
  var VERSION = "2025-12-16";

  function detectEnv() {
    // Allow explicit ?env=dev / ?env=prod
    try {
      var qs = new URLSearchParams(window.location.search || '');
      var env = (qs.get('env') || '').toLowerCase();
      if (env === 'dev' || env === 'prod') return env;
    } catch (_) {}

    var host = (window.location.hostname || '').toLowerCase();
    var path = window.location.pathname || '';

    if (host.indexOf('dev.') === 0) return 'dev';
    if (path.indexOf('/trello-powerup-dev/') !== -1) return 'dev';
    return 'prod';
  }

  function inferBase(origin, pathname) {
    if (pathname.indexOf('/trello-powerup-dev/') !== -1) return origin + '/trello-powerup-dev';
    if (pathname.indexOf('/trello-powerup/') !== -1) return origin + '/trello-powerup';
    return null;
  }

  var PROD = {
    ENV: 'prod',
    V: VERSION,
    PU_BASE: 'https://becurrent.mixtapeco.com/trello-powerup',
    APP_KEY: 'bc773ec2e45cf527b1ad22819fb7c71b',
    APP_KEYS: ['bc773ec2e45cf527b1ad22819fb7c71b'],
    APP_NAME: 'Verb-Starter Checker',
    APP_AUTHOR: 'Trav Coan',

    AI_URL: 'https://askyeti.co/api/goal/be-current',
    AI_CACHE_KEY: 'aiSuggest:v5'
  };

  var DEV = {
    ENV: 'dev',
    V: VERSION,
    PU_BASE: 'https://becurrent.mixtapeco.com/trello-powerup-dev',
    APP_KEY: 'PASTE_DEV_APP_KEY_HERE',
    APP_KEYS: ['PASTE_DEV_APP_KEY_HERE'],
    APP_NAME: 'Verb-Starter Checker (Dev)',
    APP_AUTHOR: 'Trav Coan',

    AI_URL: 'https://askyeti.co/api/goal/be-current',
    AI_CACHE_KEY: 'aiSuggest:v5'
  };

  var env = detectEnv();
  var src = (env === 'dev') ? DEV : PROD;

  // Clone to a fresh object so we can override inferred PU_BASE without mutating the templates
  var out = {};
  for (var k in src) out[k] = src[k];

  // If you're hosting this on the same domain, auto-infer the base from the folder path.
  try {
    var inferred = inferBase(window.location.origin, window.location.pathname || '');
    if (inferred) out.PU_BASE = inferred;
  } catch (_) {}

  // Guard rails (helps catch "forgot to set dev key" quickly)
  if (out.ENV === 'dev' && String(out.APP_KEY || '').indexOf('PASTE_DEV_APP_KEY_HERE') === 0) {
    console.warn('[BeCurrent config] Dev env detected but APP_KEY is still a placeholder. Update js/bc-config.js');
  }

  window.BC_CONFIG = Object.freeze(out);
})();
