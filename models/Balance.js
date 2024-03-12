const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
  aksha: {
    type: String,
  },
});

const BalanceModel = mongoose.model("Balance", BalanceSchema);
module.exports = BalanceModel;
