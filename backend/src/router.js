const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const blacklistControllers = require("./controllers/blacklistControllers");
const emailControllers = require("./controllers/emailControllers");
const dataControllers = require("./controllers/dataControllers");

const { authCheck } = require("./services/authCheckMiddleware");
const { hashPassword } = require("./services/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.post("/emails", emailControllers.add);

router.post("/datas", dataControllers.add);

router.post("/users/login", userControllers.login);
router.get("/users/check-id", userControllers.checkId);

router.use(authCheck);

router.get("/datas", dataControllers.readTen);
router.get("/datas/all", dataControllers.readAll);

router.post("/users", hashPassword, userControllers.add);
router.get("/users", userControllers.readAll);

router.get("/blacklists", blacklistControllers.readAll);
router.post("/blacklists", blacklistControllers.add);
router.post("/blacklists/delete", blacklistControllers.destroy);

/* ************************************************************************* */

module.exports = router;
