let mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);
let usersch = new mongoose.Schema({
    "_id": String,
    "name": String,
    "pwd": String,
    "phno": String,
    "role": {
        type: String,
        default: "user"
    },
    "hno": Number,
    "marks": Number
})

usersch.plugin(AutoIncrement, {
    inc_field: 'hno', // Name of the field to increment
    // Optional: specify a starting value
    startAt: 600001
});
let um = mongoose.model("user", usersch)
module.exports = um