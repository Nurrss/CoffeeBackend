const router = require("express").Router();
const Balance = require("../models/Balance");
const {
  getBalance,
  updateBalance,
  deleteBalance,
  addBalance,
} = require("../controller/balanceController");

const errorHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

router.get("/", getBalance);
router.put("/:id", updateBalance);
router.delete("/", deleteBalance);
router.post("/add", addBalance);

// router.put("/:id", async (req, res) => {
//   try {
//     const { aksha } = req.body;
//     const updatedBalance = await Balance.findByIdAndUpdate(
//       req.params.id,
//       { aksha },
//       { new: true }
//     );
//     if (!updatedBalance) {
//       return res.status(404).json({ error: "Balance not found" });
//     }
//     res.status(200).json({ data: updatedBalance });
//   } catch (err) {
//     errorHandler(err, req, res);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const balance = await Balance.findById(req.params.id);
//     if (!balance) {
//       return res.status(404).json({ error: "Example not found" });
//     }
//     res.status(200).json({ data: balance });
//   } catch (err) {
//     errorHandler(err, req, res);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedBalance = await Balance.findByIdAndDelete(req.params.id);
//     if (!deletedBalance) {
//       return res.status(404).json({ error: "Balance not found" });
//     }
//     res.status(200).json({ message: "Balance deleted successfully" });
//   } catch (err) {
//     errorHandler(err, req, res);
//   }
// });

module.exports = router;
