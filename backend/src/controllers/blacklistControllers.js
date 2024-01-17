const tables = require("../tables");

const read = async (req, res, next) => {
  try {
    const blacklist = await tables.blacklist.read(req.params.id);

    if (blacklist == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(blacklist);
    }
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const blacklist = await tables.blacklist.readAll();

    res.status(200).json(blacklist);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { mot } = req.body;

  try {
    const blacklist = await tables.blacklist.read(mot);

    console.info(blacklist);

    if (blacklist === undefined) {
      await tables.blacklist.create(mot);
      await tables.data.delete(mot);
      res
        .status(201)
        .send({ message: "Mot ajouté avec succès dans la blacklist" });
    } else {
      res.status(409).send({ message: "Mot déjà présent dans la blacklist" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { mot } = req.body;

  try {
    const blacklist = await tables.blacklist.read(mot);

    if (blacklist === undefined) {
      res.status(404).send({ message: "Mot non trouvé dans la blacklist" });
    } else {
      await tables.blacklist.delete(mot);
      res
        .status(200)
        .send({ message: "Mot supprimé avec succès de la blacklist" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  readAll,
  add,
  destroy,
};
