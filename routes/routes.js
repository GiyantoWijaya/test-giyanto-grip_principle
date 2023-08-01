const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const userRoutes = require("./user.routes");
const bookRoutes = require("./book.routes");

const jsonParser = bodyParser.json();

router.use("/", jsonParser, userRoutes);
router.use("/book", jsonParser, bookRoutes);

module.exports = router;
