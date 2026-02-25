let mongoose= require('mongoose');
let cartsch= new mongoose.Schema({
    "_id": String,
    "title": String,
    "price": Number,
    "img": String,
    "qty": Number,
    "uid": String,
    "pid": String,
});
let cartmodel = mongoose.model("carts",cartsch);
module.exports= cartmodel;
