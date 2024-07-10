const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt =require('bcryptjs');
router.post('/', async (req, res) => {
    const {username , email,mobile,password}=req.body;

    try {

        const hashpassword= await bcrypt.hash(password,10);

        const user=new User({
            username,
            email,
            mobile,
            password:hashpassword
        })
        await user.save();

        return res.status(200).json({message:"user added succesfully"});
    } catch (error) {
        return res.status(500).json({message:"user not added"});
    }
  
});
module.exports = router;
