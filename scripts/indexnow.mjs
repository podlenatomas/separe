#!/usr/bin/env node
// Ping IndexNow for Bing / Yandex / Seznam / DuckDuckGo / Naver.
// Usage: node scripts/indexnow.mjs            (pings homepage CS+EN)
//        node scripts/indexnow.mjs <url> ...  (pings explicit URLs)
//
// Read more: https://www.indexnow.org/

const KEY = "cf5eeffc6753ad57c3435a22961067bff302f760bf160fc2168f6db6ffb4c778";
const HOST = "www.separe-mikulandska.cz";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const explicit = process.argv.slice(2);
const urlList =
  explicit.length > 0
    ? explicit
    : [`https://${HOST}/`, `https://${HOST}/en`];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`IndexNow → HTTP ${res.status} ${res.statusText}`);
console.log(`  host: ${HOST}`);
console.log(`  urls: ${urlList.length}`);
urlList.forEach((u) => console.log(`    - ${u}`));

if (res.status === 200 || res.status === 202) {
  console.log("✓ accepted");
  process.exit(0);
} else {
  const text = await res.text().catch(() => "");
  if (text) console.log(`  body: ${text}`);
  process.exit(1);
}
