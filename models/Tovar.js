const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tovarSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Tovar = mongoose.model("Tovar", tovarSchema);
module.exports = Tovar;
