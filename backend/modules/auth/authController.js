const User = require("../auth/modal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendResponse = require("../../utils/response");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, false, "User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return sendResponse(res, 201, true, "User registered successfully", {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, "Invalid credentials");
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return sendResponse(res, 200, true, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return sendResponse(res, 500, false, err.message);
  }
};

module.exports = {
  register,
  login,
};