#!/usr/bin/env python3
"""Build a safe, attribution-first India legal RSS headline snapshot for GitHub Pages.

No paid API, AI summaries, scrapes, secrets or third-party Python packages.
Failed feeds do not wipe a previously valid snapshot. The app reads raw GitHub
because GITHUB_TOKEN commits do not trigger a Pages build.
"""
from __future__ import annotations
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from hashlib import sha256
from html import unescape
from pathlib import Path
from urllib.parse import quote, urlsplit
from urllib.request import Request, urlopen
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "news.json"
SEARCHES = (
    ('Supreme Court India judgment when:7d', 'Google News'),
    ('Karnataka High Court judgment when:7d', 'Google News'),
    ('Karnataka State Law University KSLU notice when:14d', 'Google News'),
    ('India parliament bill law amendment gazette when:7d', 'Google News'),
    ('Indian law legal rights court ruling when:7d', 'Google News'),
)
FEEDS = [
    ("https://news.google.com/rss/search?q=" + quote(q) + "&hl=en-IN&gl=IN&ceid=IN:en", src)
    for q, src in SEARCHES
] + [
    ("https://legal.economictimes.indiatimes.com/rss/topstories", "ET LegalWorld"),
    ("https://legal.economictimes.indiatimes.com/rss/litigation", "ET LegalWorld"),
    ("https://legal.economictimes.indiatimes.com/rss/law-policy", "ET LegalWorld"),
]
LEGAL = re.compile(r'\b(law|court|judg(?:e|es|ment|ments)|judic(?:ial|iary)|legal|advocat|bail|constitution|supreme|tribunal|act\b|bill\b|statute|rights|legislation|regulat|petition|arbitration|litigation|contempt|criminal|police|fundamental|kslu|university|parliament|gazette|lawyer|privacy|appeal|justice)\b', re.I)
TAG = re.compile(r"<[^>]*>")
SPACE = re.compile(r"\s+")

def clean(value: str, limit: int = 270) -> str:
    value = unescape(TAG.sub(" ", value or ""))
    return SPACE.sub(" ", value).strip()[:limit]

def category(title: str) -> str:
    t = title.lower()
    if "kslu" in t or "karnataka state law university" in t:
        return "KSLU"
    if re.search(r'karnataka|bengaluru|bangalore', t):
        return "Karnataka"
    if re.search(r'supreme court|apex court|constitution bench|chief justice of india|\bcji\b', t):
        return "Supreme Court"
    if re.search(r'parliament|lok sabha|rajya sabha|\bbill\b|ordinance|gazette|amendment|legislation|new law', t):
        return "Legislation"
    return "Latest"

def priority(title: str) -> int:
    t = title.lower()
    signal = re.search(r'constitution bench|landmark|strikes down|struck down|constitutional validity|fundamental rights|new criminal law|major amendment|supreme court rules|high court rules|kslu.*exam|kslu.*notification', t)
    return 2 if signal else (1 if re.search(r'supreme court|high court|parliament|kslu|constitutional|amendment',t) else 0)

def date_of(value: str):
    try:
        value = value.strip()
        if not value:
            return None
        if "T" in value:
            d = datetime.fromisoformat(value.replace("Z","+00:00"))
        else:
            d = parsedate_to_datetime(value)
        if d.tzinfo is None:
            d = d.replace(tzinfo=timezone.utc)
        return d.astimezone(timezone.utc)
    except (ValueError, TypeError, OverflowError):
        return None

def read_xml(url: str, origin: str):
    req = Request(url, headers={"User-Agent":"LawLearningStudentNews/1.0 (+https://github.com/Manojislearning/law-learning)", "Accept":"application/rss+xml, application/xml, text/xml"})
    with urlopen(req, timeout=24) as response:
        payload = response.read(1_500_001)
        if len(payload) > 1_500_000:
            raise ValueError("Oversize feed")
    feed = ET.fromstring(payload)
    now = datetime.now(timezone.utc)
    minimum = now - timedelta(days=14)
    items = []
    for entry in feed.findall("./channel/item")[:75]:
        title = clean(entry.findtext("title",""))
        source = clean(entry.findtext("source","") or origin, 80)
        link = (entry.findtext("link","") or "").strip()
        published = date_of(entry.findtext("pubDate","") or "")
        if not 15 <= len(title) <= 270 or not LEGAL.search(title) or not published or not minimum <= published <= now+timedelta(hours=2):
            continue
        parsed = urlsplit(link)
        if parsed.scheme != "https" or not parsed.netloc:
            continue
        if source and title.endswith(" - "+source):
            title = title[:-(len(source)+3)].strip()
        if not title or len(title)<12:
            continue
        # Source excerpts are intentionally not republished: RSS descriptions
        # may be entire third-party stories, or misleading list-of-links HTML.
        key = re.sub(r'[^a-z0-9]+', '', title.lower())[:150]
        ident = sha256(key.encode("utf-8")).hexdigest()[:16]
        items.append({
            "id": ident, "title": title, "url": link, "source": source or origin,
            "publishedAt": published.isoformat(timespec="seconds").replace("+00:00","Z"),
            "category": category(title), "priority": priority(title)
        })
    return items

def build(feeds=FEEDS):
    successes = 0
    candidates = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        jobs = {pool.submit(read_xml,url,source):url for url,source in feeds}
        for job in as_completed(jobs):
            try:
                found=job.result()
                successes += 1
                candidates.extend(found)
                print("Read",len(found),"items from",jobs[job])
            except Exception as exc:
                print("Feed failed:",jobs[job],type(exc).__name__,str(exc)[:120])
    if not successes:
        raise RuntimeError("No RSS source responded; leaving prior snapshot untouched.")
    indexed = {}
    for item in candidates:
        old = indexed.get(item["id"])
        if old is None or item["publishedAt"]>old["publishedAt"] or item["priority"]>old["priority"]:
            indexed[item["id"]]=item
    entries=sorted(indexed.values(),key=lambda x:(x["publishedAt"],x["priority"]),reverse=True)[:140]
    if not entries:
        raise RuntimeError("RSS responded but no relevant recent headlines; prior snapshot preserved.")
    return {"schema":1,"generatedAt":datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00","Z"),"items":entries}

if __name__ == "__main__":
    result=build()
    OUT.parent.mkdir(parents=True,exist_ok=True)
    tmp=OUT.with_suffix(".tmp")
    tmp.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    tmp.replace(OUT)
    print("Published",len(result["items"]),"news headlines")
