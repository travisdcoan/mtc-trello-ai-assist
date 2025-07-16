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
        url: './composer-warning.html',
        height: 100
      });
    }
    return [];
  },
    "card-buttons": function(t, opts){
    return [{
      // icon can be any 16×16 image URL
      icon: {
        url: 'https://trello.com/favicon.ico',
        size: 16
      },
      text: 'Check Verb',
      callback: function(t){
        // fetch the card name
        return t.card('name')
          .then(({ name }) => {
            const title = (name||'').toLowerCase();
            const hasVerb = Array.from(verbSet).some(v => title.includes(v));
            if (!hasVerb) {
              // show your warning popup
              return t.popup({
                title: '⚠️ Missing Verb',
                url: './composer-warning.html',
                height: 100
              });
            } else {
              // optional “all good” notification
              return t.popup({
                title: '✅ Looks good!',
                url: './okay.html',  // create a simple okay.html or just replace with t.close()
                height: 60
              });
            }
          });
      }
    }];
  }
});

