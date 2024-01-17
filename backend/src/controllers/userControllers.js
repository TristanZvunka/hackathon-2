const argon2 = require("@node-rs/argon2");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const readAll = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { email, hashedPassword } = req.body;

  try {
    const checkEmail = await tables.user.checkEmail(email);

    if (checkEmail.length === 1) {
      res.status(200).send({ message: "Email déjà utilisé" });
    } else {
      await tables.user.create(email, hashedPassword);

      res.status(201).send({ message: "Votre compte a était crée" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    await tables.user.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await tables.user.checkEmail(email);

    if (checkUser.length === 0) {
      res.status(200).send({
        message: "Aucun compte n'a été trouvé avec cet email",
      });
    } else {
      const checkPassword = await argon2.verify(
        checkUser[0].password,
        password
      );

      if (!checkPassword) {
        res.status(200).send({ message: "Mot de passe incorrect" });
      } else {
        delete checkUser[0].password;

        const token = jwt.sign(
          { id: checkUser[0].id },
          process.env.APP_SECRET,
          { expiresIn: "1h" }
        );

        if (checkUser.length === 1) {
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
          });
          res.status(200).send({
            message: "Authentification réussie",
            admin: true,
          });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

const checkId = async (req, res, next) => {
  try {
    if (req.cookies.token !== undefined) {
      const { token } = req.cookies;

      const { id } = jwt.verify(token, process.env.APP_SECRET);

      const checkUser = await tables.user.read(id);

      if (checkUser !== null) {
        res.status(200).send({ message: "OK" });
      } else {
        res.status(200).send({ message: "Utilisateur introuvable" });
      }
    } else {
      res.status(200).send({ message: "Utilisateur introuvable" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  readAll,
  add,
  destroy,
  login,
  checkId,
};
