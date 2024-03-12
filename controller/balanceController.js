const Balance = require("../models/Balance");

const getBalance = (req, res) => {
  Balance.find()
    .then((balance) => res.json(balance))
    .catch((error) => {
      console.log(error);
      res.json({ message: "No such of balance" });
    });
};

module.exports = {
  getBalance,
};
