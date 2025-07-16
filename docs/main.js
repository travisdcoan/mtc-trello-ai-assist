// docs/main.js

const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize({
  "card-badges": function(t, opts) {
    return t.card('name')
      .then(({ name }) => {
        const first = (name||"")
                        .trim()
                        .split(/\s+/)[0]
                        .toLowerCase();

        // if it doesn’t start with a verb, show a red badge
        if (!verbSet.has(first)) {
          return [{
            text: "❗ Missing Verb",
            color: "red",
            // when clicked, open your popup.html
            callback: function(t) {
              return t.popup({
                title: 'Please include a verb',
                url: 'https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html',
                height: 120
              });
            },
            refresh: 30
          }];
        }
        return [];
      });
  }
});
