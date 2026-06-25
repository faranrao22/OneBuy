const express = require("express");
const router = express.Router();
const authRoutes = require("../../modules/auth/authRoutes");

router.use("/auth/", authRoutes);

module.exports = router;

