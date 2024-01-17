const express = require("express");

const router = express.Router();

const blacklistControllers = require("./controllers/blacklistControllers");
const emailControllers = require("./controllers/emailControllers");
const dataControllers = require("./controllers/dataControllers");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.post("/emails", emailControllers.add);

router.get("/datas", dataControllers.readAll);
router.post("/datas", dataControllers.add);

router.get("/blacklists", blacklistControllers.readAll);
router.post("/blacklists", blacklistControllers.add);
router.post("/blacklists/delete", blacklistControllers.destroy);

/* ************************************************************************* */

module.exports = router;
