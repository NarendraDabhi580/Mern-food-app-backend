const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//user auth
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "All fields (fullName, email, password) are required."
    });
  }
  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token,{
  httpOnly: true,
  secure: true,        // 🔥 REQUIRED (HTTPS)
  sameSite: "none",    // 🔥 REQUIRED (cross-site)
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",      
});
  res.status(201).json({
    message: "User register successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid user or password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token,{
  httpOnly: true,
  secure: true,        // 🔥 REQUIRED (HTTPS)
  sameSite: "none",    // 🔥 REQUIRED (cross-site)
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};

//food-partner auth
const registerFoodPartner = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields (name, email, password) are required."
    });
  }
  const isAccountAlreadyExist = await foodPartnerModel.findOne({ email });
  if (isAccountAlreadyExist) {
    return res.status(400).json({
      message: "Food partner already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
  res.cookie("token", token,{
  httpOnly: true,
  secure: true,        // 🔥 REQUIRED (HTTPS)
  sameSite: "none",    // 🔥 REQUIRED (cross-site)
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});
  res.status(201).json({
    message: "Account created successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
};

const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }
  const foodPartner = await foodPartnerModel.findOne({ email });
  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
  res.cookie("token", token,{
  httpOnly: true,
  secure: true,        // 🔥 REQUIRED (HTTPS)
  sameSite: "none",    // 🔥 REQUIRED (cross-site)
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
});
  res.status(200).json({
    message: "Food partner logged in successfully",
    user: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
};

const logoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully !!",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
