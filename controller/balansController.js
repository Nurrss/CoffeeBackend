const Balans = require("../models/Balans");

const getBalans = (req, res) => {
  Balans.find()
    .then((balans) => res.json(balans))
    .catch((error) => {
      console.log(error);
      res.json({ message: "No such of balans" });
    });
};

module.exports = {
  getBalans,
};
