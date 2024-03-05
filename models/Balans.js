const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BalansSchema = new Schema({
  aksha: {
    type: Number,
  },
});

const BalansModel = mongoose.model("Balans", BalansSchema);
module.exports = BalansModel;
