const links = [
  "https://www.soscisurvey.de/kgnpp/?act=9k0hCHSguLAxToC88GXatOtB",
  "https://www.soscisurvey.de/egp/?act=9mS886iKnpjWZJgzNDrwqqyo",
  "https://www.soscisurvey.de/kgpp/?act=Nbel0UaWwEp2dOKLN36o1FCx",
  "https://www.soscisurvey.de/pegp/?act=VJ6pSkgm8bY9G0PlGJ1bzBIU",
  "https://www.soscisurvey.de/pkgnpp/?act=C1gCbTZD7QNKEPcy975mwjWx",
  "https://www.soscisurvey.de/pkgpp/?act=sVKat7EhjfCIuZBChYWj8y6m"
];

exports.handler = async (event, context) => {
  const netlify = require("@netlify/functions");
  const db = netlify.kv; // Netlify Key-Value Store für globalen Zähler

  // Hole aktuellen globalen Zählerwert
  let count = await db.get("click_count");
  count = count ? parseInt(count) : 0;

  const linkIndex = count % links.length; // Bestimme Link
  const redirectUrl = links[linkIndex];

  await db.set("click_count", count + 1); // Erhöhe Zähler global

  return {
    statusCode: 302,
    headers: { Location: redirectUrl }
  };
};
