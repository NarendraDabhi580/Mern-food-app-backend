const foodModel = require("../models/food.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  const { buffer } = req.file;
  const fileUploadResult = await uploadFile(buffer, uuid());

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res
    .status(201)
    .json({ message: "Food created successfully", food: foodItem });
};

const getFoodItems = async (req, res) => {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Foods fetched successfully !!",
    foodItems,
  });
};

module.exports = { createFood, getFoodItems };
