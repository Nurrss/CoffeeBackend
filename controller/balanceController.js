const Balance = require("../models/Balance");

const getBalance = (req, res) => {
  Balance.find()
    .then((balance) => res.json(balance))
    .catch((error) => {
      console.log(error);
      res.json({ message: "No such of Balance" });
    });
};

const updateBalance = async (req, res) => {
  try {
    const { aksha } = req.body;
    const updatedBalance = await Balance.findByIdAndUpdate(
      req.params.id,
      { aksha },
      { new: true }
    );
    if (!updatedBalance) {
      return res.status(404).json({ error: "Balance not found" });
    }
    res.status(200).json({ data: updatedBalance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBalance = async (req, res) => {
  try {
    const deletedBalance = await Balance.findByIdAndDelete(req.params.id);
    if (!deletedBalance) {
      return res.status(404).json({ error: "Balance not found" });
    }
    res.status(200).json({ message: "Balance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBalance,
  updateBalance,
  deleteBalance,
};
