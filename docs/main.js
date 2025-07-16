// docs/main.js

const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize({

  // 1. Front-of-card badge in list view
  "card-badges": async function(t) {
    const { name } = await t.card("name");
    const first = (name||"").trim().split(/\s+/)[0].toLowerCase();
    if (!verbSet.has(first)) {
      const msg = `It looks like your card “${name}” isn’t starting with a verb.`;
      return [{
        text:  msg,
        color: "red",
        refresh: 30
      }];
    }
    return [];
  },

  // 2. Detail badge on the back of the card (clickable → popup)
  "card-detail-badges": async function(t) {
    const { name } = await t.card("name");
    const first = (name||"").trim().split(/\s+/)[0].toLowerCase();
    if (!verbSet.has(first)) {
      const msg = `It looks like your card “${name}” isn’t starting with a verb.`;
      return [{
        title: "Missing Verb",
        text:  msg,
        color: "red",
        callback: async function(t) {
          // pass the card title into the popup via args
          return t.popup({
            title: "Rename Suggestion",
            url:   "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
            args:  { name },
            height: 200
          });
        }
      }];
    }
    return [];
  }

});
