const router = require("express").Router();
const Tovar = require("../models/Tovar");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newExample = new Tovar({ email });
    await newExample.save();
    res.status(201).json(newExample);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const examples_tovar = await Tovar.find();
    res.json(examples_tovar);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tovar = await Tovar.findById(req.params.id);
    if (!tovar) {
      return res.status(404).json({ error: "Tovar not found" });
    }
    res.json(tovar);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const updatedCoffee = await Tovar.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );
    if (!updatedCoffee) {
      return res.status(404).json({ error: "Tovar not found" });
    }
    res.json(updatedCoffee);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCoffee = await Tovar.findByIdAndDelete(req.params.id);
    if (!deletedCoffee) {
      return res.status(404).json({ error: "Tovar not found" });
    }
    res.json({ message: "Tovar deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;
