const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    mobile: String,
    password: String
},{collection:"loginuser"});

const User = mongoose.model('User', userSchema);

module.exports=User;