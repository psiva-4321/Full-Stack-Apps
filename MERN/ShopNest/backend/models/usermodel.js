let mongoose= require('mongoose');
let usersch= new mongoose.Schema({
    "_id": String,
    "name": String,
    "pwd": String,
    "phno": String,
    "role": {
        type: String,
        default: "user"
    },
    "otp":String
});
let usermodel = mongoose.model("users",usersch);
module.exports= usermodel;
 