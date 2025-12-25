const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authFoodPartnerMiddlware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "Please Login Fisrt !!",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = { authFoodPartnerMiddlware, authUserMiddleware };
