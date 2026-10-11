import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";

const file=(name)=>readFileSync(new URL("../"+name,import.meta.url),"utf8");
test("news route, accessible feed and refresh assets are connected",()=>{
  const html=file("index.html"),core=file("app-core.js"),sw=file("sw.js");
  assert.match(html,/data-open="news"/);
  assert.match(html,/id="news-view"/);
  assert.match(html,/id="news-root"/);
  assert.match(html,/news-feed\.js\?v=57/);
  assert.match(core,/news:\["Legal current affairs","Law News"\]/);
  assert.ok(sw.includes("./news-feed.js?v=57"));
  assert.ok(sw.includes("./data/news.json"));
  assert.ok(sw.includes("./news.css?v=57"));
});
test("news initial snapshot schema is stable and never has invented starter headlines",()=>{
  const feed=JSON.parse(file("data/news.json"));
  assert.equal(feed.schema,1);
  assert.ok(Array.isArray(feed.items));
  for(const item of feed.items){
    assert.match(item.id,/^[a-f0-9]{16}$/);
    assert.match(item.url,/^https:\/\//);
    assert.ok(Date.parse(item.publishedAt));
  }
});
test("news app does not publish raw HTML or pretend to verify rulings",()=>{
  const js=file("news-feed.js");
  assert.ok(!js.includes("innerHTML"));
  assert.ok(js.includes("textContent"));
  assert.ok(js.includes("Practice one question"));
  assert.ok(js.includes("reported by")||js.includes("Reported by"));
  assert.ok(js.includes("raw.githubusercontent.com"));
  assert.ok(!js.includes("hashchange"));
  assert.ok(js.includes("news-media"));
  assert.ok(js.includes("publisher") || js.includes("PUBLISHER"));
  assert.ok(js.includes("photo.loading="));
  assert.ok(js.includes("validImage(item.image)"));
});
