// netlify/functions/redirect.js
const Redis = require("ioredis");
const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL, {
  token: process.env.UPSTASH_REDIS_TOKEN
});
const links = [
  "https://www.soscisurvey.de/egp/",
  "https://www.soscisurvey.de/kgnpp/",
  "https://www.soscisurvey.de/kgpp/",
  "https://www.soscisurvey.de/pegp/",
  "https://www.soscisurvey.de/pkgnpp/",
  "https://www.soscisurvey.de/pkgpp/"
];
exports.handler = async () => {
  const count = await redis.incr("globalRedirectCounter");
  const prev = count - 1;
  const nextLink = links[prev % links.length];
  return {
    statusCode: 302,
    headers: { Location: nextLink },
    body: "Redirecting…"
  };
};
