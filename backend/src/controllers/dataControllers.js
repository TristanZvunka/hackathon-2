const tables = require("../tables");

const add = async (req, res, next) => {
  const { phrase } = req.body;
  try {
    const blacklistWord = [
      "le",
      "la",
      "les",
      "un",
      "une",
      "des",
      "du",
      "de",
      "d'",
      "l'",
      "et",
      "ou",
      "où",
      "à",
      "a",
      "au",
      "aux",
      "en",
      "dans",
      "par",
      "pour",
      "sur",
      "sous",
      "vers",
      "avec",
      "sans",
      "chez",
      "entre",
      "mais",
      "donc",
      "or",
      "ni",
      "car",
      "que",
      "qui",
      "quoi",
      "quand",
      "comment",
      "pourquoi",
      "combien",
      "quel",
      "quelle",
      "quels",
      "quelles",
      "si",
      "comme",
      "lorsque",
      "lorsqu'",
      "lors",
      "puisque",
      "quoique",
      "afin",
      "alors",
      "aussi",
      "autant",
      "autre",
      "autres",
      "autrement",
      "autour",
      "autrefois",
      "autrui",
      "avant",
      "avec",
      "bien",
      "bientôt",
    ];

    const mot = phrase.split(" ");

    for (let i = 0; i < mot.length; i += 1) {
      mot[i] = mot[i].toLowerCase();

      if (blacklistWord.includes(mot[i])) {
        continue; // eslint-disable-line
      }

      const usedWord = await tables.data.read(mot[i]); // eslint-disable-line

      if (usedWord.length === 0) {
        const count = 1;
        await tables.data.create(mot[i], count); // eslint-disable-line
      } else {
        const count = usedWord[0].count + 1;
        await tables.data.update(mot[i], count); // eslint-disable-line
      }
    }
    res.status(201).send({ phrase });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
};
