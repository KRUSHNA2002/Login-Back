const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/User'); // Adjust path as per your project structure
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("Internal server error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
