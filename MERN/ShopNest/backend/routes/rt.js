let express = require('express');
let { bookproduct, getbookings } = require("../controllers/bookingcont");
let { addcart, getcartitems, incqty, decqty, deletecartitem } = require('../controllers/cartcont');
let { reg, login, sendotp, resetpwd } = require('../controllers/usercont');
let { 
  addproduct,
  getproducts,
  getproductbyid,
  getprodbycategory,
  updateproduct,
  upload,
  searchprod,
  updateproductimg,
  deleteprod
} = require('../controllers/productcont');

let rt = express.Router();

rt.post('/reg', reg);
rt.post('/login', login);

rt.post('/addproduct', upload.single('img'), addproduct);
rt.get('/getproducts', getproducts);
rt.get('/getproductbyid/:id', getproductbyid);
rt.get('/searchprod/:title', searchprod);  // ✅ FIXED
rt.get('/getprodbycategory/:category', getprodbycategory);
rt.put('/updateproduct', updateproduct);
rt.put('/updateproductimg', upload.single('img'), updateproductimg);

rt.post('/addcart', addcart);
rt.get('/getcartitems/:uid', getcartitems);
rt.put('/incqty/:cid', incqty);
rt.put('/decqty/:cid', decqty);
rt.delete('/deletecartitem/:cid', deletecartitem);
rt.delete('/deleteprod/:id', deleteprod);

rt.get("/sendotp/:eid", sendotp);
rt.post("/resetpwd", resetpwd);



module.exports = rt;