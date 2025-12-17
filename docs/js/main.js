// https://becurrent.mixtapeco.com/trello-powerup/js/main.js
// Offline verb detection for Trello cards (no API calls).

// === BeCurrent Power-Up config ===
const APP_KEY = "06d29ef207dfaed1d7e3feba0323b561";  // your Trello app key
const PU_BASE = "https://travisdcoan.github.io/mtc-trello-ai-assist-dev/";
const V = "2025-11-13";                                 // cache-buster for collaborators

// Base-form verbs only (lemmas). Keep all lowercase.
// Base-form verbs only (lemmas). Keep all lowercase.
const VERB_LEMMAS = [
  "accept",
  "acknowledge",
  "add",
  "address",
  "adjust",
  "administer",
  "advise",
  "agree",
  "align",
  "allocate",
  "analyze",
  "answer",
  "apply",
  "approve",
  "arrange",
  "ask",
  "assign",
  "attach",
  "attend",
  "audit",
  "automate",
  "backup",
  "balance",
  "begin",
  "benchmark",
  "bill",
  "book",
  "brainstorm",
  "brief",
  "bring",
  "build",
  "buy",
  "calculate",
  "call",
  "cancel",
  "capture",
  "care",
  "carry",
  "catalog",
  "categorize",
  "change",
  "check",
  "choose",
  "clarify",
  "clean",
  "cleanse",
  "clear",
  "close",
  "coach",
  "collaborate",
  "collect",
  "combine",
  "comment",
  "communicate",
  "compare",
  "compile",
  "complete",
  "compose",
  "compute",
  "configure",
  "confirm",
  "connect",
  "consider",
  "consolidate",
  "construct",
  "consult",
  "contact",
  "contribute",
  "convert",
  "cook",
  "coordinate",
  "copy",
  "correct",
  "create",
  "curate",
  "customize",
  "debug",
  "decide",
  "decline",
  "declutter",
  "defer",
  "define",
  "delegate",
  "delete",
  "deliver",
  "demo",
  "deploy",
  "design",
  "detail",
  "develop",
  "diagnose",
  "discuss",
  "dispatch",
  "document",
  "donate",
  "draft",
  "eat",
  "edit",
  "email",
  "embed",
  "emphasize",
  "enable",
  "engineer",
  "enhance",
  "enjoy",
  "ensure",
  "estimate",
  "evaluate",
  "examine",
  "execute",
  "exercise",
  "explain",
  "explore",
  "export",
  "file",
  "fill",
  "finalize",
  "find",
  "fix",
  "focus",
  "follow",
  "forecast",
  "form",
  "format",
  "forward",
  "gather",
  "generate",
  "get",
  "give",
  "go",
  "graph",
  "group",
  "handle",
  "help",
  "highlight",
  "hire",
  "hold",
  "host",
  "identify",
  "illustrate",
  "implement",
  "improve",
  "increase",
  "index",
  "inform",
  "ingest",
  "initiate",
  "inspect",
  "install",
  "integrate",
  "interview",
  "inventory",
  "investigate",
  "invite",
  "invoice",
  "join",
  "journal",
  "jump",
  "label",
  "launch",
  "learn",
  "leave",
  "lend",
  "list",
  "listen",
  "locate",
  "log",
  "look",
  "maintain",
  "make",
  "manage",
  "map",
  "mark",
  "maximize",
  "measure",
  "meditate",
  "merge",
  "message",
  "migrate",
  "minimize",
  "monitor",
  "move",
  "name",
  "navigate",
  "note",
  "notify",
  "observe",
  "onboard",
  "optimize",
  "order",
  "organize",
  "outline",
  "own",
  "package",
  "pair",
  "pay",
  "perform",
  "phone",
  "photograph",
  "pin",
  "plan",
  "post",
  "practice",
  "pray",
  "prepare",
  "present",
  "print",
  "prioritize",
  "probe",
  "process",
  "procure",
  "produce",
  "profile",
  "program",
  "proofread",
  "propose",
  "protect",
  "prototype",
  "provide",
  "publish",
  "purchase",
  "push",
  "qualify",
  "query",
  "queue",
  "read",
  "reach",
  "reboot",
  "record",
  "recruit",
  "reduce",
  "refactor",
  "refile",
  "refine",
  "register",
  "rehearse",
  "reinstall",
  "relax",
  "release",
  "remind",
  "remove",
  "rename",
  "repair",
  "replace",
  "report",
  "request",
  "research",
  "reserve",
  "resolve",
  "respond",
  "restart",
  "restore",
  "restructure",
  "resume",
  "review",
  "revise",
  "route",
  "run",
  "save",
  "schedule",
  "scope",
  "screen",
  "search",
  "secure",
  "select",
  "send",
  "separate",
  "set",
  "settle",
  "share",
  "ship",
  "shop",
  "show",
  "sign",
  "simplify",
  "simulate",
  "sketch",
  "sleep",
  "solve",
  "sort",
  "spec",
  "specify",
  "split",
  "stage",
  "start",
  "store",
  "stream",
  "stretch",
  "structure",
  "study",
  "submit",
  "subscribe",
  "summarize",
  "support",
  "survey",
  "sync",
  "tag",
  "teach",
  "test",
  "text",
  "track",
  "train",
  "transcribe",
  "transfer",
  "translate",
  "travel",
  "triage",
  "trigger",
  "uninstall",
  "update",
  "upgrade",
  "upload",
  "verify",
  "vet",
  "visit",
  "vote",
  "walk",
  "watch",
  "welcome",
  "wire",
  "wireframe",
  "work",
  "write",
  "zip"
];


// Build a Set for O(1) lookups
const VERB_SET = new Set(VERB_LEMMAS.map(v => v.toLowerCase()));

// Irregular verb map (common forms -> lemma)
const IRREGULAR = new Map(Object.entries({
  "am":"be","are":"be","is":"be","was":"be","were":"be","been":"be","being":"be",
  "has":"have","had":"have","having":"have",
  "did":"do","done":"do","does":"do","doing":"do",
  "went":"go","gone":"go","goes":"go","going":"go",
  "made":"make","makes":"make","making":"make",
  "took":"take","taken":"take","takes":"take","taking":"take",
  "came":"come","comes":"come","coming":"come",
  "saw":"see","seen":"see","sees":"see","seeing":"see",
  "said":"say","says":"say","saying":"say",
  "got":"get","gets":"get","getting":"get",
  "knew":"know","known":"know","knows":"know","knowing":"know",
  "gave":"give","given":"give","gives":"give","giving":"give",
  "found":"find","finds":"find","finding":"find",
  "thought":"think","thinks":"think","thinking":"think",
  "told":"tell","tells":"tell","telling":"tell",
  "became":"become","becomes":"become","becoming":"become",
  "showed":"show","shown":"show","shows":"show","showing":"show",
  "left":"leave","leaves":"leave","leaving":"leave",
  "felt":"feel","feels":"feel","feeling":"feel",
  "put":"put","puts":"put","putting":"put",
  "brought":"bring","brings":"bring","bringing":"bring",
  "began":"begin","begun":"begin","begins":"begin","beginning":"begin",
  "kept":"keep","keeps":"keep","keeping":"keep",
  "held":"hold","holds":"hold","holding":"hold",
  "wrote":"write","written":"write","writes":"write","writing":"write",
  "stood":"stand","stands":"stand","standing":"stand",
  "heard":"hear","hears":"hear","hearing":"hear",
  "let":"let","lets":"let","letting":"let",
  "meant":"mean","means":"mean","meaning":"mean",
  "set":"set","sets":"set","setting":"set",
  "met":"meet","meets":"meet","meeting":"meet",
  "ran":"run","runs":"run","running":"run",
  "paid":"pay","pays":"pay","paying":"pay",
  "sat":"sit","sits":"sit","sitting":"sit",
  "spoke":"speak","spoken":"speak","speaks":"speak","speaking":"speak",
  "lay":"lie","lain":"lie","lies":"lie","lying":"lie"
}));

// Homograph nouns/verbs (ambiguous starters)
const AMBIGUOUS_NOUNS = new Set([
  "access","address","answer","approach","attack","balance","book","brush","call","camp","care","cause",
  "chain","change","circle","coach","color","comb","contract","copy","dance","date","decrease","delay",
  "design","display","file","film","finish","fish","fix","form","frame","function","glue","hammer","hand",
  "head","help","hide","hit","iron","joke","judge","kiss","label","land","laugh","lead","level","light",
  "love","mail","map","mark","match","milk","mind","nail","note","object","order","paint","park","phone",
  "pick","place","plant","play","point","present","print","process","produce","project","promise","protest","question",
  "race","record","reply","report","rest","rock","roll","row","run","sail","sample","scale","score","shop",
  "sign","smoke","sound","spell","step","stop","study","support","survey","talk","test","tie","transport",
  "trust","type","visit","voice","wait","walk","watch","water","work","limit"
]);

// Phrase cues for ambiguous words
const EXPLICIT_AMBIGUOUS_PAIRS = new Map(Object.entries({
  shop: new Set(["for"]),
  present: new Set(["to"]),
  record: new Set(["a","the"]),
  access: new Set(["the"])
}));

const AMBIGUOUS_CUES = {
  determiners: new Set(["a","an","the","this","that","these","those","my","your","our","their","his","her","its"]),
  pronouns:    new Set(["it","them","me","you","him","her","us"]),
  preps:       new Set(["for","to","with","from","into","onto","about","by","on","in","at"])
};

// Strip leading non-alphanumerics, get first token, lower-case
function firstWordRaw(name) {
  if (!name) return "";
  const cleaned = name.trim().replace(/^[^\p{L}\p{N}]+/u, "");
  return cleaned.split(/\s+/)[0].toLocaleLowerCase("en-US");
}

// Rule-based lemmatizer
function toVerbLemma(word) {
  if (!word) return "";
  if (IRREGULAR.has(word)) return IRREGULAR.get(word);
  word = word.replace(/[’']/g, "");
  if (/ies$/.test(word)) { const base = word.slice(0, -3) + "y"; if (VERB_SET.has(base)) return base; }
  if (/s$/.test(word) && !/ss$/.test(word)) { const base = word.slice(0, -1); if (VERB_SET.has(base)) return base; }
  if (/ied$/.test(word)) { const base = word.slice(0, -3) + "y"; if (VERB_SET.has(base)) return base; }
  if (/ed$/.test(word)) { const base = word.slice(0, -2); if (VERB_SET.has(base)) return base; }
  if (/ing$/.test(word)) { const base = word.slice(0, -3); if (VERB_SET.has(base)) return base; const withE = base + "e"; if (VERB_SET.has(withE)) return withE; }
  return word;
}

function looksLikeAmbiguousVerb(tokens) {
  const f = (tokens[0] || "").toLowerCase();
  const s = (tokens[1] || "").toLowerCase();
  if (!s) return false;
  const pairs = EXPLICIT_AMBIGUOUS_PAIRS.get(f);
  if (pairs && pairs.has(s)) return true;
  if (AMBIGUOUS_CUES.determiners.has(s)) return true;
  if (AMBIGUOUS_CUES.pronouns.has(s))    return true;
  if (AMBIGUOUS_CUES.preps.has(s))       return true;
  return false;
}

function startsWithVerb(name) {
  const raw = String(name || "").trim().replace(/^[^\p{L}\p{N}]+/u, "");
  if (!raw) return false;
  const tokens = raw.split(/\s+/);
  const first  = tokens[0].toLocaleLowerCase("en-US");
  if (AMBIGUOUS_NOUNS.has(first)) return looksLikeAmbiguousVerb(tokens);
  if (VERB_SET.has(first)) return true;
  const lemma = toVerbLemma(first);
  return VERB_SET.has(lemma);
}

function trimForToast(str = "", max = 60) {
  const s = String(str).trim();
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

// ── Done detection (saved setting first, then fallback by list name) ────────
async function isInDone(t, idList) {
  try {
    const saved = await t.get('board', 'shared', 'doneList'); // { id, name }
    if (saved?.id && idList && saved.id === idList) return true;
    const { name: listName } = await t.list('name');
    if (listName && /(done|complete)/i.test(listName)) return true;
  } catch (_) {}
  return false;
}

// ── Per-list suppression (independent from Done) ────────────────────────────
async function suggestionsSuppressed(t, idList) {
  if (await isInDone(t, idList)) return true;
  try {
    // Read either key (back-compat) and merge
    const savedA = await t.get('board', 'shared', 'suggestionDisabledLists');
    const savedB = await t.get('board', 'shared', 'suppressLists');
    const disabled = [...new Set([...(savedA || []), ...(savedB || [])])];
    if (Array.isArray(disabled) && idList && disabled.includes(idList)) return true;
  } catch (_) {}
  return false;
}

// ─── Toast only (no modal) — safe for card-badges ───────────────────────────
async function maybeShowVerbToast(t, cardId, cardName, shortLink) {
  try {
    const now  = Date.now();
    const last = await t.get("member", "private", "verbToastLastAt");
    if (last && (now - last) < 15000) return; // 15s throttle
    await t.set("member", "private", "verbToastLastAt", now);
    const title = trimForToast(cardName);
    setTimeout(() => {
      t.alert({
        display: "warning",
        message: `Card “${title}” has no action.\nConsider adding a verb to make it actionable.`,
        duration: 8
      }).catch(() => {});
    }, 0);
  } catch (e) {
    console.warn("[PU] toast failed:", e);
  }
}

// ───────────────────────────── Power-Up init ────────────────────────────────
window.TrelloPowerUp.initialize(
  {
    // Show welcome modal when enabling the Power-Up
    "on-enable": function (t) {
      return t.modal({
        title: "Welcome to BeCurrent",
        url:   `${PU_BASE}/welcome.html?v=${V}`,
        height: 760
      });
    },

    // Front-of-card badge (icon only), plus toast; hidden on Done/suppressed lists
    "card-badges": async (t) => {
      const { id, name, shortLink, idList } = await t.card("id","name","shortLink","idList");

      // If card is in the Done list, always show a blue icon badge
      if (await isInDone(t, idList)) {
        return [{
          icon: `${PU_BASE}/img/icon-32-white.png?v=${V}`,
          color: "blue",
          refresh: 20
        }];
      }

      if (await suggestionsSuppressed(t, idList)) return [];

      if (!startsWithVerb(name)) {
        // fire-and-forget toast
        maybeShowVerbToast(t, id, name, shortLink);
        return [{
          icon: `${PU_BASE}/img/icon-32-white.png?v=${V}`,
          color: "lime",
          refresh: 20
        }];
      }
      return [];
    },

    // Back-of-card badges
    "card-detail-badges": async (t) => {
      const { id: cardId, name, idList } = await t.card("id","name","idList");
      const badges = [];

      // 1) If in Done → show "BeCurrent next steps"
      const inDone = await isInDone(t, idList);
      if (inDone) {
        badges.push({
          title: "BeCurrent Next Steps",
          text:  "BeCurrent next steps suggestions",
          color: "blue",
          callback: (t, opts) => t.popup({
            title: "BeCurrent next steps suggestions",
            url:   `${PU_BASE}/next-steps.html?v=${V}`,
            args:  { cardId, name },   // no key in args
            height: 260,
            mouseEvent: opts.event
          })
        });
      }

      // 2) Suggestions badge
      const suppressed = await suggestionsSuppressed(t, idList);
      if (!suppressed && !startsWithVerb(name)) {
        badges.push({
          title: "BeCurrent Suggestions",
          text:  "View suggestions",
          color: "lime",
          callback: (t, opts) => t.popup({
            title: "Rename Suggestions",
            url:   `${PU_BASE}/popup.html?v=${V}`,
            args:  { cardId, name },   // no key in args
            height: 420,
            mouseEvent: opts.event
          })
        });
      }

      return badges;
    },

    // Optional back-of-card button
    "card-buttons": async (t) => {
      const { id: cardId, name, idList } = await t.card("id","name","idList");
      if (await suggestionsSuppressed(t, idList)) return [];
      if (!startsWithVerb(name)) {
        return [{
          icon: `${PU_BASE}/img/icon-32-white.png?v=${V}`,
          text: "Rename Suggested",
          callback: (t, opts) => t.popup({
            title: "Rename Suggestions",
            url:   `${PU_BASE}/popup.html?v=${V}`,
            args:  { cardId, name },   // no key in args
            height: 260,
            mouseEvent: opts.event
          })
        }];
      }
      return [];
    },

    // Board button → welcome modal
    "board-buttons": function (t) {
      return [{
        icon: {
          dark:  `${PU_BASE}/img/icon-white.png`,
          light: `${PU_BASE}/img/icon-black.png`
        },
        text: "BeCurrent",
        callback: function (t) {
          return t.modal({
            title: "Welcome to BeCurrent",
            url:   `${PU_BASE}/welcome.html?v=${V}`,
            height: 760
          });
        }
      }];
    },

    // Settings modal
    "show-settings": function (t) {
      return t.modal({
        title: "BeCurrent • Settings",
        url:   `${PU_BASE}/settings.html?v=${V}`,
        height: 460
      });
    },

    // Keep this simple; don't call t.render() here.
    "authorization-status": function () {
      return { authorized: true };
    }
  },
  {
    appKey:  APP_KEY, // must match iframe pages' appKey
    appName: "Verb-Starter Checker (Offline)",
    appAuthor:"Trav Coan"
  }
);
