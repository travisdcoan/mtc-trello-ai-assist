// docs/main.js

const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize({
  "card-buttons": function(t, opts) {
    return [{
      icon: { url: 'https://trello.com/favicon.ico', size: 16 },
      text: 'Check Verb',
      callback: function(t) {
        return t.card('name')
          .then(({ name }) => {
            // normalize first word
            const first = (name||"").trim().split(/\s+/)[0].toLowerCase();
            if (!verbSet.has(first)) {
              // show warning popup
              return t.popup({
                title: '⚠️ Missing Verb',
                url: 'https://travisdcoan.github.io/mtc-trello-ai-assist/popup.html',
                height: 120
              });
            }
            // otherwise just close it
            return t.close();
          });
      }
    }];
  }
});
