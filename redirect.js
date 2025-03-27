let globalCounter = 0; // Achtung: Diese Variable ist nicht dauerhaft stabil

const links = [
  "https://www.soscisurvey.de/kgnpp/?act=9k0hCHSguLAxToC88GXatOtB",
  "https://www.soscisurvey.de/egp/?act=9mS886iKnpjWZJgzNDrwqqyo",
  "https://www.soscisurvey.de/kgpp/?act=Nbel0UaWwEp2dOKLN36o1FCx",
  "https://www.soscisurvey.de/pegp/?act=VJ6pSkgm8bY9G0PlGJ1bzBIU",
  "https://www.soscisurvey.de/pkgnpp/?act=C1gCbTZD7QNKEPcy975mwjWx",
  "https://www.soscisurvey.de/pkgpp/?act=sVKat7EhjfCIuZBChYWj8y6m"
];

exports.handler = async (event, context) => {
  const index = globalCounter % links.length; // Bestimme den aktuellen Link
  globalCounter++; // Erhöhe den Zähler (Achtung: Nicht dauerhaft stabil!)

  return {
    statusCode: 302,
    headers: {
      Location: links[index]
    }
  };
};
