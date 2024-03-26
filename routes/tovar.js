const Tovar = require("../models/Tovar");
const router = require("express").Router();
// const {
//   getAllOrders,
//   getOrderById,
//   deleteOrderById,
// } = require("../controllers/orderController");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

/**
 *
 * @swagger
 * tags:
 *   name: Tovar
 *   description: Tovar manipulating routes.
 */

/**
 * @swagger
 * /tovar/add:
 *   post:
 *     summary: Add a new item
 *     description: Endpoint to add a new item with name and price.
 *     tags: [Tovar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item.
 *               price:
 *                 type: number
 *                 description: The price of the item.
 *     responses:
 *       '201':
 *         description: Item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the created item.
 *                 price:
 *                   type: number
 *                   description: The price of the created item.
 *       '400':
 *         description: Bad request. Missing or invalid parameters.
 *       '500':
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /tovar:
 *   get:
 *     summary: Get all items
 *     description: Endpoint to retrieve all items.
 *     tags: [Tovar]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Tovar'
 *       '500':
 *         description: Internal server error.
 */
router.get("/", async (req, res) => {
  try {
    const tovar = await Tovar.find();
    res.json(tovar);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

/**
 * @swagger
 * /tovar/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Endpoint to retrieve an item by its ID.
 *     tags: [Tovar]
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
 *               $ref: '#/definitions/Tovar'
 *       '404':
 *         description: Tovar not found
 *       '500':
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /tovar/update/{id}:
 *   put:
 *     summary: Update item by ID
 *     description: Endpoint to update an item by its ID.
 *     tags: [Tovar]
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
 *               name:
 *                 type: string
 *                 description: The name of the item.
 *               price:
 *                 type: number
 *                 description: The price of the item.
 *     responses:
 *       '200':
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Tovar'
 *       '404':
 *         description: Tovar not found
 *       '500':
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /tovar/delete/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     description: Endpoint to delete an item by its ID.
 *     tags: [Tovar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: Tovar not found
 *       '500':
 *         description: Internal server error.
 */
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
