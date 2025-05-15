// netlify/functions/redirect.js
const Redis = require("ioredis");

// Upstash-Redis via REST
const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL, {
  token: process.env.UPSTASH_REDIS_TOKEN
});

// Deine Round‑Robin‑Links
const links = [
  "https://www.soscisurvey.de/egp/",
  "https://www.soscisurvey.de/kgnpp/",
  "https://www.soscisurvey.de/kgpp/",
  "https://www.soscisurvey.de/pegp/",
  "https://www.soscisurvey.de/pkgnpp/",
  "https://www.soscisurvey.de/pkgpp/"
];

exports.handler = async () => {
  try {
    // Atomisch inkrementieren: INCR erstellt bei erstem Aufruf den Key mit 1
    const count = await redis.incr("globalRedirectCounter");
    
    // Weil count jetzt 1,2,3..., rechnen wir zero-based:
    const prevCount = count - 1;

    // Round‑Robin auswählen
    const nextLink = links[prevCount % links.length];

    return {
      statusCode: 302,
      headers: { Location: nextLink },
      body: "Redirecting…"
    };
  } catch (err) {
    console.error("Redirect Error", err);
    return {
      statusCode: 500,
      body: "Server error"
    };
  }
};
