// docs/main.js
const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize({
  "card-detail-badges": async function(t, opts) {
    const { name } = await t.card("name");
    const first = (name || "")
                    .trim()
                    .split(/\s+/)[0]
                    .toLowerCase();

    if (!verbSet.has(first)) {
      return [{
        title: "⚠️ Missing Verb",
        text:  "Click for help",
        color: "red",
        // when you click the badge…
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
