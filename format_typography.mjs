import fs from 'fs';
import path from 'path';

const csPath = path.resolve('messages/cs.json');
const enPath = path.resolve('messages/en.json');

let cs = JSON.parse(fs.readFileSync(csPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// 1. Add new copy
cs.About.values.quality.text = "Specializujeme se na autentická česká a moravská vína. Nejsme žádný snobský chateau, nabízíme poctivý lokální juice (včetně pet-natů a naturálek).";
en.About.values.quality.text = "We focus strictly on authentic Czech and Moravian wines. No snobby chateau vibes, just honest local juice, including pet-nats and low-intervention wines.";

// 2. Micro-typography rules
const replaceHyphens = (text) => {
    // Replace hyphens in compound words with non-breaking hyphen (&#8209; / \u2011)
    // Matches word-hyphen-word
    return text.replace(/(\w)-(\w)/g, '$1\u2011$2');
};

const preventOrphans = (text) => {
    // Replace space after single letter prepositions/conjunctions with non-breaking space (&nbsp; / \u00A0)
    // Case insensitive match for v, k, s, z, o, u, a, i
    return text.replace(/(^|\s)([vkszouaiVKSZOUAI])\s+/g, '$1$2\u00A0');
};

const processObject = (obj) => {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = preventOrphans(replaceHyphens(obj[key]));
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            processObject(obj[key]);
        }
    }
};

processObject(cs);
processObject(en);

fs.writeFileSync(csPath, JSON.stringify(cs, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Typography formatting applied.");
