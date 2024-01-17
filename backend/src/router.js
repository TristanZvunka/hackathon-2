const express = require("express");

const router = express.Router();

// const blacklistControllers = require("./controllers/blacklistControllers");
const emailControllers = require("./controllers/emailControllers");
const dataControllers = require("./controllers/dataControllers");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.post("/emails", emailControllers.add);
router.post("/datas", dataControllers.add);

/* ************************************************************************* */

module.exports = router;
