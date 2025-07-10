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
  }

});
