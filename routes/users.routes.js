const express = require("express");
const router = express.Router();
const Article = require("../models/article.model");
const User = require("../models/User.model");

router.get("/:userId", (req, res, next) => {
  res.render("../views/user/user-page");
  const userId = req.params.userId;
  console.log(userId);
  User.findById(userId)
    .then((userFromDb) => {
      if (userFromDb) {
        return Article.find();
      }
    })
    .catch((err) => {
      console.error(err);
      // res.status(500).render("error", { message: "User not found" });
      res.status(500).render("error", { message: "User Not Found" });
    });
});

module.exports = router;
