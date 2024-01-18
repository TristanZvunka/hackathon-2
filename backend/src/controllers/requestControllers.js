const tables = require("../tables");

const readAll = async (req, res, next) => {
  try {
    const readRequest = await tables.request.readAll();

    res.status(200).json(readRequest[0].count);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  readAll,
};
