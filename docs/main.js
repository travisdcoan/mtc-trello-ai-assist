// docs/main.js

const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize(
  {
    // 1. Front-of-card badge in list view (optional)
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

    // 2. On card open: immediately show the popup if missing a verb
    "card-back-section": async function(t) {
      const { id, name } = await t.card("id","name");
      const first = (name||"").trim().split(/\s+/)[0].toLowerCase();

      if (!verbSet.has(first)) {
        return [{
          title: "Rename Suggestions",
          icon: {
            url: "https://travisdcoan.github.io/mtc-trello-ai-assist/icon-48.png"
          },
          content: {
            type: "iframe",
            url:  "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
            args: { id, name },
            height: 240
          }
        }];
      }
      return [];
    }
  },
  {
    // REST helper config for your popup iframe
    appKey:    "2d28f67731b868888a2fc22bdd3295af",
    appName:   "Verb-Starter Checker",
    appAuthor: "Trav Coan"
  }
);
