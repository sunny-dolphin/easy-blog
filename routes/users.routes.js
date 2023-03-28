const express = require("express");
const router = express.Router();
const Article = require("../models/article.model");
const User = require("../models/User.model");
const mongoose = require("mongoose");

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const user = {};
  User.findById(userId)
    .then((userFromDb) => {
      if (userFromDb) {
        user.name = userFromDb.username;
        user.id = userFromDb.id;
        return Article.find({ author: user.id }).populate("author");
      }
    })
    .then((articlesFromDb) => {
      // const articles = articlesFromDb.filter((article) => {
      //   if (article.author.id === user.id) {
      //     return article;
      //   }
      // });
      const articles = articlesFromDb;
      res.render("user/user-page", { articles });
    })
    .catch((err) => {
      console.error(err);
      // res.status(500).render("error", { message: "User not found" });
      res.status(500).render("error", { message: "User Not Found" });
    });
});

module.exports = router;
