// docs/main.js

const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize(
  {
    // Front‐of‐card badge in list view (optional)
    "card-badges": async t => {
      const { name } = await t.card("name");
      const first = (name||"").trim().split(/\s+/)[0].toLowerCase();
      if (!verbSet.has(first)) {
        return [{
          text:  `It looks like your card “${name}” isn’t starting with a verb.`,
          color: "red",
          refresh: 30
        }];
      }
      return [];
    },

    // 2. Inject an inline section *and* immediately popup on open
    "card-back-section": async function(t) {
      const { id, name } = await t.card("id", "name");
      const first = (name||"").trim().split(/\s+/)[0].toLowerCase();

      if (!verbSet.has(first)) {
        // 1) Show the inline section
        const section = [{
          title: "Rename Suggestions",
          icon: {
            url:  "https://trello.com/favicon.ico",
            size: 16
          },
          content: {
            type:   "iframe",
            url:    "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
            args:   { id, name },
            height: 240
          }
        }];

        // 2) Fire the popup immediately on card‐open
        await t.popup({
          title: "Rename Suggestion",
          url:   "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
          args:  { id, name },
          height: 240
        });

        return section;
      }

      return [];
    }
  },
  {
    // REST helper config
    appKey:    "2d28f67731b868888a2fc22bdd3295af",
    appName:   "Verb-Starter Checker",
    appAuthor: "Trav Coan"
  }
);
