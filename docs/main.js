// docs/main.js

const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize(
  {
    // (Optional) Front‑of‑card badge if no verb
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

    // Two buttons on the back of each card
    "card-buttons": async t => {
      const { id: cardId, name }  = await t.card("id","name");
      const { id: boardId }       = await t.board("id");

      return [
        {
          icon: { url: 'https://trello.com/favicon.ico', size: 16 },
          text: 'Suggest Rename',
          callback: () =>
            t.popup({
              title: "Rename Suggestions",
              url:   "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
              args:  { id: cardId, name },
              height: 260
            })
        },
        {
          icon: { url: 'https://trello.com/favicon.ico', size: 16 },
          text: 'Done',
          callback: () =>
            t.popup({
              title: "Done Options",
              url:   "https://travisdcoan.github.io/mtc-trello-ai-assist/done-popup.html",
              args:  { cardId, boardId },
              height: 300
            })
        }
      ];
    }
  },
  {
    // needed for REST in your popups
    appKey:    "2d28f67731b868888a2fc22bdd3295af",
    appName:   "Verb-Starter Checker",
    appAuthor: "Trav Coan"
  }
);
