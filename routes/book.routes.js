const express = require("express");
const {
  index,
  show,
  create,
  update,
  destroy,
} = require("../controllers/book.controller");
const { auth } = require("../utils/utils");

const bookRoutes = express.Router();

bookRoutes.get("/", auth, index);
bookRoutes.get("/:id", auth, show);
bookRoutes.post("/", auth, create);
bookRoutes.put("/:id", auth, update);
bookRoutes.delete("/:id", auth, destroy);

module.exports = bookRoutes;
