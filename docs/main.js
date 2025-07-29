// docs/main.js

const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize(
  {
    // Front‑of‑card badge in list view (optional)
    "card-badges": async t => {
      const { name } = await t.card("name");
      const first = (name||"").trim().split(/\s+/)[0].toLowerCase();
      if (!verbSet.has(first)) {
        return [{
          text:  `Card “${name}” doesn’t start with a verb`,
          color: "red",
          refresh: 60
        }];
      }
      return [];
    },

    // Two clickable badges under the title on the card back
    "card-detail-badges": async function(t) {
      const { id: cardId, name } = await t.card("id","name");
      const { id: boardId }      = await t.board("id");
      const first = (name||"").trim().split(/\s+/)[0].toLowerCase();
      const badges = [];

      // Suggest Rename (only if missing verb)
      if (!verbSet.has(first)) {
        badges.push({
          title: "Suggest Rename",
          text:  "Rename",
          color: "red",
          callback: function(t, opts) {
            return t.popup({
              title: "Rename Suggestions",
              url:   "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
              args:  { cardId, name },
              height: 260,
              mouseEvent: opts.event
            });
          }
        });
      }

      // Done badge
      badges.push({
        title: "Done",
        text:  "Done",
        color: "green",
        callback: function(t, opts) {
          return t.popup({
            title: "Done Options",
            url:   "https://travisdcoan.github.io/mtc-trello-ai-assist/done-popup.html",
            args:  { cardId, boardId },
            height: 300,
            mouseEvent: opts.event
          });
        }
      });

      return badges;
    }
  },
  {
    // REST helper config
    appKey:    "2d28f67731b868888a2fc22bdd3295af",
    appName:   "Verb-Starter Checker",
    appAuthor: "Trav Coan"
  }
);
