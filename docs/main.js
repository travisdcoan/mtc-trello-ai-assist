const verbs = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];

window.TrelloPowerUp.initialize({
  "card-badges": (t) =>
    t.card('name')
     .then(({ name }) => {
       const first = name.trim().split(' ')[0];
       if (!verbs.includes(first)) {
         return [{
           text: "❗ Title not a verb",
           color: "red",
           refresh: 10
         }];
       }
       return [];
     }),

  "card-composer": (t, opts) => {
    const name = opts.name || "";
    const first = name.trim().split(' ')[0];
    if (name && !verbs.includes(first)) {
      return t.popup({
        title: "Heads up!",
        url: './composer-warning.html',
        height: 80
      });
    }
    return [];
  }
});

