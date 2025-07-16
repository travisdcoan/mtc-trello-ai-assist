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
      console.log('[VerbChecker] card-buttons called', opts);
      return [{
        icon: { url: 'https://trello.com/favicon.ico', size: 16 },
        text: 'Check Verb',
        callback: function(t) {
          console.log('[VerbChecker] button clicked');
          return t.card('name')
          .then(({name}) => {
            console.log('[VerbChecker] card name is', name);
            const title = (name||'').toLowerCase();
            const hasVerb = Array.from(verbSet).some(v => title.includes(v));
            if (!hasVerb) {
              console.log('[VerbChecker] no verb → showing popup');
              return t.popup({
                title: '⚠️ Missing Verb',
                url: 'https://travisdcoan.github.io/mtc-trello-ai-assist/composer-warning.html',
                height: 100
              });
            } else {
              console.log('[VerbChecker] verb found → closing popup');
              return t.popup({ title: '✅ OK', url: '', height: 60 })
                      .then(() => t.close());
            }
          });
        }
      }];
    }
});

