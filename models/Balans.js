const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BalansSchema = new Schema({
  text: {
    aksha: Number,
  }
});

const BalansModel = mongoose.model("Balans", BalansSchema);
module.exports = BalansModel;