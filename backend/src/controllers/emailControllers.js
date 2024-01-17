const tables = require("../tables");

const add = async (req, res, next) => {
  const email = req.body;

  try {
    const insertId = await tables.email.create(email);

    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
};
