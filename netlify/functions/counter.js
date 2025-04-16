const fs = require("fs");
const file = "/tmp/counter.json";

// Die Umleitungsliste
const links = [
    "https://www.soscisurvey.de/kgnpp/?act=dpgrNWD2g16XkeNwX7yj87bc",
    "https://www.soscisurvey.de/egp/?act=2shsmKsWb2ShTEIe6ctwbyAo",
    "https://www.soscisurvey.de/kgpp/?act=z07ALcekaIWK4W45Aa2HnjbD",
    "https://www.soscisurvey.de/pegp/?act=OlvlERGrxGXFlF9GopHfsVKN",
    "https://www.soscisurvey.de/pkgnpp/?act=mG49nQmS2LoONENDk8nujeze",
    "https://www.soscisurvey.de/pkgpp/?act=H590XLXbZr5hpRnapgJWherb"
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
