const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    topics: {
      type: [String],
      required: true,
      enum: ["Celebrities", "News", "Sports", "Personal", "Food"],
    },
    content: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    imgUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
  },
  { timestamps: true }
);

const Article = model("Article", articleSchema);

module.exports = Article;
