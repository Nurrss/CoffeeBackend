const Order = require("../models/Order");
const Balance = require("../models/Balance");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addOrder = async (req, res) => {
  try {
    const { summa } = req.body;
    const id = "65f9ab9d979f7664008a5ed7";
    const balance = await Balance.findById(id);
    console.log(balance);
    const newOrder = new Order({ summa });
    if (Number(balance.aksha) > Number(summa)) {
      const aksha = Number(balance.aksha) - Number(summa);
      const updatedBalance = await Balance.findByIdAndUpdate(
        id,
        { aksha },
        { new: true }
      );
      console.log(`New order was accepted ${updatedBalance}`);
      await newOrder.save();
      res.status(200).json(newOrder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllOrders, getOrderById, deleteOrderById, addOrder };
