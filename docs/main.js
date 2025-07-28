// docs/main.js

const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize(
  {
    // 1) Show front-of-card badge if no verb
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

    // 2) On card-open: pop up verb-suggestion & also render inline section
    "card-back-section": async t => {
      const { id, name } = await t.card("id", "name");
      const first = (name||"").trim().split(/\s+/)[0].toLowerCase();

      if (!verbSet.has(first)) {
        // Inline section (optional)
        const section = [{
          title: "Rename Suggestions",
          icon: { url: "https://trello.com/favicon.ico", size: 16 },
          content: {
            type:   "iframe",
            url:    "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
            args:   { id, name },
            height: 240
          }
        }];

        // Immediate popup on open
        await t.popup({
          title: "Rename Suggestion",
          url:   "https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html",
          args:  { id, name },
          height: 240
        });

        return section;
      }
      return [];
    },

    // 3) Card-button labeled "Done"
    "card-buttons": async t => {
      // one button per card
      return [{
        icon: { url: "https://trello.com/favicon.ico", size: 16 },
        text: "Done",
        callback: async t => {
          // fetch card & board ids
          const { id: cardId }   = await t.card("id");
          const { id: boardId }  = await t.board("id");
          return t.popup({
            title:  "Done Options",
            url:    "https://travisdcoan.github.io/mtc-trello-ai-assist/done-popup.html",
            args:   { cardId, boardId },
            height: 260
          });
        }
      }];
    }
  },
  {
    // for any REST calls inside your popups
    appKey:    "2d28f67731b868888a2fc22bdd3295af",
    appName:   "Verb-Starter Checker",
    appAuthor: "Trav Coan"
  }
);
