const Balans = require("../models/Balans");


const getBalans = (req, res) => {
  Balans.find()
    .then((balans) => res.json(balans))
    .catch((error) => {
      console.log(error);
      res.json({ message: "No such of balans" });
    });
};


const updateBalans = async (req, res) => {
  try {
    const { aksha } = req.body;
    const updatedBalans = await Balans.findByIdAndUpdate(
      req.params.id,
      { aksha },
      { new: true }
    );
    if (!updatedBalans) {
      return res.status(404).json({ error: "Balans not found" });
    }
    res.status(200).json({ data: updatedBalans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBalans = async (req, res) => {
  try {
    const deletedBalans = await Balans.findByIdAndDelete(req.params.id);
    if (!deletedBalans) {
      return res.status(404).json({ error: "Balans not found" });
    }
    res.status(200).json({ message: "Balans deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBalans,
  updateBalans,
  deleteBalans,
};
