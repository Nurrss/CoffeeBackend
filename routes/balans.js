const router = require("express").Router();
const Balans = require("../models/Balans");
const { getBalans } = require("../controller/balansController");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

router.get("/", getBalans);

router.put("/:id", async (req, res) => {
  try {
    const { aksha } = req.body;
    const updatedBalans = await Balans.findByIdAndUpdate(
      req.params.id,
      { aksha },
      { new: true }
    );
    if (!updatedBalans) {
      return res.status(404).json({ error: "Balanse not found" });
    }
    res.status(200).json({ data: updatedBalans });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const balans = await Balans.findById(req.params.id);
    if (!balans) {
      return res.status(404).json({ error: "Example not found" });
    }
    res.status(200).json({ data: balans });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBalans = await Balans.findByIdAndDelete(req.params.id);
    if (!deletedBalans) {
      return res.status(404).json({ error: "Balans not found" });
    }
    res.status(200).json({ message: "Balans deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;
