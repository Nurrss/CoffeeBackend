const Order = require("../models/Order");
const router = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  deleteOrderById,
} = require("../controller/ordersController");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrderById);

// router.post("/", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const newOrder = new Order({ email });
//     await newOrder.save();
//     res.status(201).json(newOrder);
//   } catch (err) {
//     errorHandler(err, req, res);
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (err) {
//     errorHandler(err, req, res);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.json(order);
//   } catch (err) {
//     errorHandler(err, req, res);
//   }
// });

// // router.put("/:id", async (req, res) => {
// //   try {
// //     const { summa } = req.body;
// //     const updatedOrder = await Order.findByIdAndUpdate(
// //       req.params.id,
// //       { summa },
// //       { new: true }
// //     );
// //     if (!updatedOrder) {
// //       return res.status(404).json({ error: "Order not found" });
// //     }
// //     res.json(updatedOrder);
// //   } catch (err) {
// //     errorHandler(err, req, res);
// //   }
// // });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     if (!deletedOrder) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.json({ message: "Order deleted successfully" });
//   } catch (err) {
//     errorHandler(err, req, res);
//   }
// });

module.exports = router;
