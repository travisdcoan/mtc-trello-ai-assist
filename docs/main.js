const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize({

  // 1) Front-of-card badge in list view
  "card-badges": async function(t) {
    const { name } = await t.card("name");
    const first = (name||"").trim().split(/\s+/)[0].toLowerCase();
    if (!verbSet.has(first)) {
      return [{
        text: "❗ Missing Verb",  // main visible warning
        color: "red",
        refresh: 30
      }];
    }
    return [];
  },

  // 2) Detail badge on the card back (clickable → popup)
  "card-detail-badges": async function(t) {
    const { name } = await t.card("name");
    const first = (name||"").trim().split(/\s+/)[0].toLowerCase();
    if (!verbSet.has(first)) {
      return [{
        title: "⚠️ Missing Verb",
        text:  "Click for help",
        color: "red",
        callback: async function(t) {
          return t.popup({
            title: "Please start with a verb",
            url:   "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
            height: 120
          });
        }
      }];
    }
    return [];
  }
});
