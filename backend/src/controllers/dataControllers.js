const tables = require("../tables");

const add = async (req, res, next) => {
  const { phrase } = req.body;
  try {
    const mot = phrase.split(" ");

    for (let i = 0; i < mot.length; i += 1) {
      mot[i] = mot[i].toLowerCase();

      const blacklist = await tables.blacklist.read(mot[i]); // eslint-disable-line

      if (blacklist !== undefined) {
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
