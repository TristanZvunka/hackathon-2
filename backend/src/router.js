const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "public/uploads" });
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userController module for handling item-related operations
const userController = require("./controllers/userController");

// Route to get a list of items
router.get("/users", userController.browse);

// Route to get a specific item by ID
router.get("/users/:id", userController.read);

// Route to add a new item
router.post("/users", upload.single("avatar"), userController.add);

/* ************************************************************************* */

module.exports = router;
