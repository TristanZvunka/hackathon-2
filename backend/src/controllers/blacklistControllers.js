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

// Ready to export the controller functions
module.exports = {
  read,
};
