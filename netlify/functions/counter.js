const fs = require("fs");
const file = "/tmp/counter.json";

// Die Umleitungsliste
const links = [
    "https://www.soscisurvey.de/kgnpp/?act=DATRjrTnCEjbWRj4FtAMwbnd",
    "https://www.soscisurvey.de/egp/?act=WsCJIBUOAoGkln4ORi1en8cl",
    "https://www.soscisurvey.de/kgpp/?act=j2rxidAm2264Pe9NfyezGT57",
    "https://www.soscisurvey.de/pegp/?act=963JdhlaLBxSMsXlbxq5XBke",
    "https://www.soscisurvey.de/pkgnpp/?act=2SjuQTVNfDyi6mGkvyAytAYC",
    "https://www.soscisurvey.de/pkgpp/?act=dVkbCNRGJDeQ88sGxgv8EaEf"
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
