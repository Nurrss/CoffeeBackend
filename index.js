const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const balanceRoute = require("./routes/balance");
const ordersRoute = require("./routes/order");
const tovarsRoute = require("./routes/tovar");

const port = 8000;

app.use(express.json());
app.use(morgan("common"));

const DB_URL =
  "mongodb+srv://nurrsserkul:1234@cluster0.cvoja0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log("Backend server is running at: ", port);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

app.use("/balance", balanceRoute);
app.use("/order", ordersRoute);
app.use("/tovar", tovarsRoute);

// it should be in the end
app.use(function (req, res) {
  return res.status(404).json({ message: "Endpoint not found" });
});
