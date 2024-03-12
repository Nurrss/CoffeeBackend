const router = require("express").Router();
const Tovar = require("../models/Tovar");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

//done
router.post("/add", async (req, res) => {
  try {
    const { name, price } = req.body;
    const tovar = new Tovar({ name, price });
    await tovar.save();
    res.status(201).json(tovar);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

//done
router.get("/", async (req, res) => {
  try {
    const tovar = await Tovar.find();
    res.json(tovar);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

//done
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

router.put("/update/:id", async (req, res) => {
  try {
    const { name, price } = req.body;
    const updatedTovar = await Tovar.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true }
    );
    if (!updatedTovar) {
      return res.status(404).json({ error: "Tovar not found" });
    }
    res.json(updatedTovar);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTovar = await Tovar.findByIdAndDelete(req.params.id);
    if (!deletedTovar) {
      return res.status(404).json({ error: "Tovar not found" });
    }
    res.json({ message: "Tovar deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;
