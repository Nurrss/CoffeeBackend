const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  coffee: [],
  summa: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
