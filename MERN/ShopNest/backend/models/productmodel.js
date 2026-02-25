    let mongoose= require('mongoose');
let productsch= new mongoose.Schema({
    "_id": String,
    "title": String,
    "price": Number,
    "desc": String,
    "category": String,
    "img": String,
    "comm":[{"text":String,"rt":Number}]
});
let productmodel = mongoose.model("products",productsch);
module.exports= productmodel;

    
