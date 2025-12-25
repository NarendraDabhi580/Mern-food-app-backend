//create server
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const cors = require("cors");

app.use(
  cors({
    origin: "https://eloquent-arithmetic-3ed087.netlify.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use("/api/auth", express.json(), authRoutes);
app.use("/api/food", foodRoutes);

module.exports = app;
