const tables = require("../tables");

const add = async (req, res, next) => {
  const { phrase } = req.body;
  try {
    const newPhrase = phrase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""); // eslint-disable-line
    const mot = newPhrase.split(" ");

    for (let i = 0; i < mot.length; i += 1) {
      mot[i] = mot[i].toLowerCase();

      const blacklist = await tables.blacklist.read(mot[i]); // eslint-disable-line

      if (blacklist !== undefined) {
        continue; // eslint-disable-line
      }

      if (mot[i] === "") continue; // eslint-disable-line

      const usedWord = await tables.data.read(mot[i]); // eslint-disable-line

      if (usedWord.length === 0) {
        const count = 1;
        await tables.data.create(mot[i], count); // eslint-disable-line
      } else {
        const count = usedWord[0].count + 1;
        await tables.data.update(mot[i], count); // eslint-disable-line
      }
    }

    const request = await tables.request.readAll();

    if (request.length === 0) {
      await tables.request.create(1); // eslint-disable-line
    } else {
      const counter = request[0].count + 1;
      await tables.request.update(counter); // eslint-disable-line
    }

    res.status(201).send({ phrase });
  } catch (err) {
    next(err);
  }
};

const readTen = async (req, res, next) => {
  try {
    const data = await tables.data.readTen();

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const data = await tables.data.readAll();

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  readAll,
  readTen,
};
