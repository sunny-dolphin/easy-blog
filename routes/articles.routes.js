const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const Article = require("../models/article.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// Create an article
router.get("/create", (req, res, next) => {
  res.render("articles/create");
});

router.post("/create", (req, res, next) => {
  const blog = new Article({
    title: req.body.title,
    author: req.body.author,
    topics: req.body.topics,
    content: req.body.content,
    views: views.body.content,
  });

  article
    .save()
    .then((newArticle) => {
      res.redirect(`/articles/${newArticle.id}`);
    })
    .catch((err) => next(err));
});

module.exports = router;
