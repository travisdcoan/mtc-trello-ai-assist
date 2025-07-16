const verbs   = ["Add","Assign","Close","Create","Fix","Review","Update","Write"];
const verbSet = new Set(verbs.map(v => v.toLowerCase()));

window.TrelloPowerUp.initialize({
  "card-back-section": function(t, opts) {
    return t.card('name')
      .then(({ name }) => {
        const first = (name || "")
                        .trim()
                        .split(/\s+/)[0]
                        .toLowerCase();
        if (!verbSet.has(first)) {
          return [{
            title: '⚠️ Missing Verb',
            icon: {
              // switch to Trello’s own favicon for testing
              url: 'https://trello.com/favicon.ico'
            },
            content: {
              type: 'iframe',
              url: 'https://travisdcoan.github.io/mtc-trello-ai-assist/warning-section.html',
              height: 120
            }
          }];
        }
        return [];
      });
  }
});
