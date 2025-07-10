// your original verbs list (can stay mixed-case)
const verbs = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];

// build a Set of lowercase verbs for fast, case-insensitive lookup
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize({

  // Card badges on the front of the card
  "card-badges": t =>
    t.card('name')
     .then(({ name }) => {
       const firstWord = (name || "").trim().split(' ')[0].toLowerCase();
       if (firstWord && !verbSet.has(firstWord)) {
         return [{
           text: "❗ Title not a verb",
           color: "red",
           refresh: 10
         }];
       }
       return [];
     }),

  // Popup in the composer before you save the card
  "card-composer": (t, opts) => {
    const firstWord = (opts.name || "").trim().split(' ')[0].toLowerCase();
    if (opts.name && !verbSet.has(firstWord)) {
      return t.popup({
        title: "Heads up!",
        url: './composer-warning.html',
        height: 80
      });
    }
    return [];
  }

});
