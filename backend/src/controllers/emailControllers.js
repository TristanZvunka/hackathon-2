const tables = require("../tables");

const add = async (req, res, next) => {
  const email = req.body;

  try {
    const emailCheck = await tables.email.read(email.email);

    if (emailCheck === 0) {
      await tables.email.create(email.email);

      res.status(201).json({ message: "Email envoyé avec succès" });
    } else {
      res.status(200).json({ message: "Email envoyé avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
};
