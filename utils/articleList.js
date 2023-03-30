const Article = require("../models/article.model");
const User = require("../models/User.model");
const isOwner = require("../utils/isOwner");

async function checkUser(userId) {
  try {
    userFromDb = await User.findById(userId);
    return userFromDb.id;
  } catch (err) {
    console.error(err);
    // res.status(499).render("error", { message: "User not found" });
    res.status(404).render("error", { message: "User Not Found" });
  }
}

async function listArticles(req, searchForUserById) {
  try {
    const query = {};
    if (searchForUserById) {
      const checkedUserId = await checkUser(searchForUserById);
      query.author = checkedUserId;
    }
    articlesFromDb = await Article.find(query).populate("author");
    articlesFromDb.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    const articles = articlesFromDb.map((article) => {
      const ownerStatus = isOwner(req, article.author.id);
      return (article = {
        content: article.content.slice(0, 200),
        id: article.id,
        title: article.title,
        author: article.author.username,
        authorId: article.author.id,
        creationMonth: article.createdAt.getMonth(),
        creationYear: article.createdAt.getFullYear(),
        img: article.imgUrl,
        owner: ownerStatus,
      });
    });
    return articles;
  } catch (err) {
    throw err;
  }
}

module.exports = listArticles;
