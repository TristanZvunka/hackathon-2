const jwt = require("jsonwebtoken");
const tables = require("../tables");

const authCheck = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      res.status(204).send({ message: "Vous n'êtes pas connecté" });
    } else {
      const { token } = req.cookies;

      const { id } = jwt.verify(token, process.env.APP_SECRET);

      const checkUser = await tables.user.read(id);

      if (checkUser !== null) {
        next();
      } else {
        res
          .status(401)
          .send({ message: "Vous n'avez pas accès a cette page!" });
      }
    }
  } catch (err) {
    res.status(401).send({ message: "Vous n'avez pas accès a cette page!" });
    next(err);
  }
};

module.exports = { authCheck };
