import fs from 'fs';
import path from 'path';

const csPath = path.resolve('messages/cs.json');
const enPath = path.resolve('messages/en.json');

const cs = JSON.parse(fs.readFileSync(csPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Convert unicode back to literal HTML entities for Webflow pasting
const backToHtmlEntities = (text) => {
    return text.replace(/\u00A0/g, '&nbsp;').replace(/\u2011/g, '&#8209;');
};

const processObject = (obj) => {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = backToHtmlEntities(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            processObject(obj[key]);
        }
    }
};

processObject(cs);
processObject(en);

const output = `
## CZECH COPY (S HTML ENTITAMI)
${JSON.stringify(cs, null, 2)}

## ENGLISH COPY (WITH HTML ENTITIES)
${JSON.stringify(en, null, 2)}
`;

fs.writeFileSync(path.resolve('webflow_export.txt'), output);
console.log("Exported literal entities.");
