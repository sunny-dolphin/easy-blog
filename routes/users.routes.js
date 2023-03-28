const express = require("express");
const router = express.Router();
const Article = require("../models/article.model");
const User = require("../models/User.model");

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  User.findById(userId)
    .then((userFromDb) => {
      if (userFromDb) {
        return Article.find();
      }
      res.status(500).render("error", { message: "User not found" });
    })
    .catch((err) => next(err));
});

module.exports = router;
