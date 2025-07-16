// your original verbs list
const verbs = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
// lowercase set for fast lookup
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize({

  // front-of-card badge (unchanged)
  "card-badges": t =>
    t.card('name')
     .then(({ name }) => {
       const title = (name || "").toLowerCase();
       // check if any verb appears anywhere
       const hasVerb = Array.from(verbSet).some(verb => title.includes(verb));
       if (title && !hasVerb) {
         return [{
           text: "❗ No verb found",
           color: "red",
           refresh: 10
         }];
       }
       return [];
     }),

  // composer popup: runs before the card is created
  "card-composer": (t, opts) => {
    const title = (opts.name || "").toLowerCase();
    const hasVerb = Array.from(verbSet).some(verb => title.includes(verb));
    if (title && !hasVerb) {
      return t.popup({
        title: "⚠️ Heads up",
        url: 'https://travisdcoan.github.io/mtc-trello-ai-assist/composer-warning.html',
        height: 100
      });
    }
    return [];
  },
  "card-buttons": function(t, opts) {
    return [{
      icon: { url: 'https://trello.com/favicon.ico', size: 16 },
      text: 'Check Verb',
      callback: function(t) {
        return t
          .card('name')
          .then(({ name }) => {
            // grab and normalize the first word
            const first = (name || "")
              .trim()
              .split(/\s+/)[0]
              .toLowerCase();

            // if it’s not in our verbSet, fire the popup
            if (!verbSet.has(first)) {
              return t.popup({
                title: '⚠️ Missing Verb',
                // use the absolute URL to your hosted HTML
                url: 'https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html',
                height: 120
              });
            }

            // otherwise just close (no warning)
            return t.close();
          });
      }
    }];
  }
});

