const express = require("express");
const { createFood, getFoodItems } = require("../controllers/food.controller");
const { authFoodPartnerMiddlware, authUserMiddleware } = require("../middleware/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/", upload.single("video"), authFoodPartnerMiddlware, createFood);
router.get("/", authUserMiddleware, getFoodItems);

module.exports = router;
