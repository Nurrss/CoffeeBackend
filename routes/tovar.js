const router = require("express").Router();
const Example = require("../models/Example");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newExample = new Example({ email });
    await newExample.save();
    res.status(201).json(newExample);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ error: "Example not found" });
    }
    res.json(example);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const updatedExample = await Example.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );
    if (!updatedExample) {
      return res.status(404).json({ error: "Example not found" });
    }
    res.json(updatedExample);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedExample = await Example.findByIdAndDelete(req.params.id);
    if (!deletedExample) {
      return res.status(404).json({ error: "Example not found" });
    }
    res.json({ message: "Example deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;
