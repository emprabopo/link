const links = [
    "https://www.soscisurvey.de/kgnpp/?act=9k0hCHSguLAxToC88GXatOtB",
    "https://www.soscisurvey.de/egp/?act=9mS886iKnpjWZJgzNDrwqqyo",
    "https://www.soscisurvey.de/kgpp/?act=Nbel0UaWwEp2dOKLN36o1FCx",
    "https://www.soscisurvey.de/pegp/?act=VJ6pSkgm8bY9G0PlGJ1bzBIU",
    "https://www.soscisurvey.de/pkgnpp/?act=C1gCbTZD7QNKEPcy975mwjWx",
    "https://www.soscisurvey.de/pkgpp/?act=sVKat7EhjfCIuZBChYWj8y6m"
];

const fetch = require('node-fetch');

const KV_URL = "https://kv-store.netlify.app/your_unique_key"; // ERSETZEN MIT DEINEM KEY!

exports.handler = async function(event, context) {
    try {
        let counterRes = await fetch(KV_URL);
        let counterData = await counterRes.json();
        
        let counter = counterData.count || 0;
        let link = links[counter % links.length];

        await fetch(KV_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ count: counter + 1 })
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: link })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Fehler beim Abrufen des Links." })
        };
    }
};
