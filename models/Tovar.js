const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tovarSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Tovar = mongoose.model('Tovar', tovarSchema);
module.exports = Tovar;
