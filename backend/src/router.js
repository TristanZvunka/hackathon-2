const express = require("express");

const router = express.Router();

const emailControllers = require("./controllers/emailControllers");
const dataControllers = require("./controllers/dataControllers");

const validateEmail = require("./validators/validateEmail");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.post("/emails", validateEmail, emailControllers.add);
router.post("/datas", dataControllers.add);

/* ************************************************************************* */

module.exports = router;