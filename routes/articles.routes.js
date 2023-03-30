const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Require the User model in order to interact with the database
const Article = require("../models/article.model");
// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

// Create an article
router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("create-article");
});
// Store the data received from create article form into database

router.post(
  "/create",
  isLoggedIn,
  fileUploader.single("imgPath"),
  (req, res, next) => {
    console.log(req.file.path);
    const blog = {
      title: req.body.title,
      author: req.session.currentUser._id,
      topics: req.body.topics,
      content: req.body.content,
      imgUrl: req.file.path,
    };
    console.log(blog);

    // Regular expression to check if title has only characters and spaces.
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(req.body.title)) {
      return res.status(400).render("create-article", {
        errorMessage:
          "You title should only contain words, no special characters or numbers allowed",
      });
    }
    if (
      req.body.title == "" ||
      req.body.imgUrl == "" ||
      req.body.content == ""
    ) {
      return res.status(400).render("create-article", {
        errorMessage:
          "All the fields are mandatory, Please provide title, description and select an image",
      });
    }

    Article.create(blog)
      .then((newArticle) => {
        // console.log(newArticle);
        res.redirect(`/articles/${newArticle.id}`);
      })
      .catch((err) => next(err));
  }
);

router.get("/:id", (req, res, next) => {
  const articleId = req.params.id;
  Article.findById(articleId)
    .populate("author")
    .then((article) => {
      article = {
        content: article.content,
        title: article.title,
        author: article.author.username,
        authorId: article.author._id,
        creationMonth: article.createdAt.getMonth(),
        creationYear: article.createdAt.getFullYear(),
        img: article.imgUrl,
      };
      // console.log(article);
      res.render("../views/article/article-page", { article });
    })
    .catch((err) => next(err));
});

// Create an article
router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("article/create-article");
});

router.post("/create", (req, res, next) => {
  const userId = req.session._id;
  const blog = {
    title: req.body.title,
    author: userId,
    topics: req.body.topics,
    content: req.body.content,
    imgUrl: req.body.imgUrl,
  };
  console.log("This will be the new:", blog);

  Article.create(blog)
    .then((newArticle) => {
      // console.log(newArticle);
      res.redirect(`/articles/${newArticle.id}`);
    })
    .catch((err) => next(err));
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Article.findById(id)
    .then((articleToEdit) => {
      console.log(articleToEdit);
      res.render(`article/update-articles`, { article: articleToEdit });
    })
    .catch((e) => {
      console.log("error updating article", e);
      next(e);
    });
});

router.post("/:id/edit", (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((article) => res.redirect(`/users/${article.author._id}`))
    .catch((error) => next(error));
});

router.get("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Article.findByIdAndDelete(id)
    .then((article) => res.redirect(`/users/${article.author._id}`))
    .catch((error) => next(error));
});
module.exports = router;
