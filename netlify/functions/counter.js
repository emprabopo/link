const fs = require("fs");
const file = "/tmp/counter.json";

// Die Umleitungsliste
const links = [
    "https://www.soscisurvey.de/kgnpp/?act=9k0hCHSguLAxToC88GXatOtB",
    "https://www.soscisurvey.de/egp/?act=9mS886iKnpjWZJgzNDrwqqyo",
    "https://www.soscisurvey.de/kgpp/?act=Nbel0UaWwEp2dOKLN36o1FCx",
    "https://www.soscisurvey.de/pegp/?act=VJ6pSkgm8bY9G0PlGJ1bzBIU",
    "https://www.soscisurvey.de/pkgnpp/?act=C1gCbTZD7QNKEPcy975mwjWx",
    "https://www.soscisurvey.de/pkgpp/?act=sVKat7EhjfCIuZBChYWj8y6m"
];

exports.handler = async function () {
    let count = 0;

    // Versuche, den aktuellen Zählerstand zu laden
    if (fs.existsSync(file)) {
        count = JSON.parse(fs.readFileSync(file, "utf8")).count || 0;
    }

    // Bestimme den nächsten Link
    const nextLink = links[count % links.length];

    // Erhöhe den Zähler und speichere ihn
    fs.writeFileSync(file, JSON.stringify({ count: count + 1 }));

    return {
        statusCode: 302,
        headers: {
            Location: nextLink
        },
        body: "Redirecting..."
    };
};
