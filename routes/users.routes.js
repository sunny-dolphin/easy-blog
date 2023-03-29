const express = require("express");
const router = express.Router();
const listArticles = require("../utils/articleList");

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  listArticles(req, userId)
    .then((articles) => {
      res.render("user/user-page", { articles });
    })
    .catch((err) => next(err));
});

module.exports = router;
