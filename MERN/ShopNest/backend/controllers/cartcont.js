let { v4: uuidv4 } = require("uuid");
let cartmodel = require("../models/cartmodel");
let addcart = async (req, res) => {
  try {
    let data = await cartmodel.find({ "uid": req.body.uid, "pid": req.body.pid });
    if (data.length == 0) {
      let cdata = new cartmodel({ ...req.body, _id: uuidv4(), qty: 1 });
      await cdata.save();

      let x = await cartmodel.find({ uid: req.body.uid });
      let count = x.length;
      res.status(200).json({ msg: "Product added to cart", count: count });
    } else {
      await cartmodel.findByIdAndUpdate(data[0]._id, { $inc: { qty: 1 } });
      res.json({ msg: "Product quantity increased" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
let getcartitems = async (req, res) => {
  try {
    let data = await cartmodel.find({ uid: req.params.uid });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
let incqty = async (req, res) => {
  try {
    await cartmodel.findByIdAndUpdate(req.params.cid, { $inc: { qty: 1 } });
    res.status(200).json({ msg: "Quantity increased" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
let decqty = async (req, res) => {
  try {
    let data = await cartmodel.findByIdAndUpdate(req.params.cid, {
      $inc: { qty: -1 },
    });
    res.json({ msg: "Quantity decreased" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
let deletecartitem = async (req, res) => {
  try {
    await cartmodel.findByIdAndDelete(req.params.cid);
    res.status(200).json({ msg: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
module.exports = { addcart, getcartitems, incqty, decqty, deletecartitem };
