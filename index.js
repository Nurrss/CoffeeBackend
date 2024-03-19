const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const balanceRoute = require("./routes/balance");
const ordersRoute = require("./routes/order");
const tovarsRoute = require("./routes/tovar");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = 8000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
    },
  },
  apis: ["routes/*.js"], // Укажите путь к вашим файлам маршрутов
};
const http = require("http");
const server = http.createServer(app);
app.use(express.json());
app.use(morgan("common"));

const DB_URL =
  "mongodb+srv://nurrsserkul:1234@cluster0.cvoja0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const corsConfig = {
  origin: "http://127.0.0.1:5500", // Update the origin to match your frontend URL
  credentials: true, // To allow cookies and sessions
};

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

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(cookieParser());

app.use("/balance", balanceRoute);
app.use("/order", ordersRoute);
app.use("/tovar", tovarsRoute);

// it should be in the end
app.use(function (req, res) {
  return res.status(404).json({ message: "Endpoint not found" });
});
