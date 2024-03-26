const Order = require("../models/Order");
const router = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  addOrder,
} = require("../controller/ordersController");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

/**
 *
 * @swagger
 * tags:
 *   name: Order
 *   description: Order manipulating routes.
 */

/**
 * @swagger
 * /order/add:
 *   post:
 *     summary: Add a new item
 *     description: Endpoint to add a new item with name and price.
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aksha:
 *                 type: string
 *                 description: The name of the item.
 *     responses:
 *       '201':
 *         description: Item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 aksha:
 *                   type: string
 *                   description: The price of the created item.
 *       '400':
 *         description: Bad request. Missing or invalid parameters.
 *       '500':
 *         description: Internal server error.
 */

router.post("/add", addOrder);

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all items
 *     description: Endpoint to retrieve all items.
 *     tags: [Order]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Order'
 *       '500':
 *         description: Internal server error.
 */

router.get("/", getAllOrders);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Endpoint to retrieve an item by its ID.
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error.
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /order/update/{id}:
 *   put:
 *     summary: Update item by ID
 *     description: Endpoint to update an item by its ID.
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aksha:
 *                 type: string
 *                 description: The name of the item.
 *     responses:
 *       '200':
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error.
 */

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
router.delete("/:id", deleteOrderById);

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
