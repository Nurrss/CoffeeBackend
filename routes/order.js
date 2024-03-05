const router = require("express").Router();
const Example = require("../models/Order");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newOrder = new Order({ email });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const example = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { email },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;