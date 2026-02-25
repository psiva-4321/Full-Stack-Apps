let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");
const usermodel = require("../models/usermodel");
const cartmodel = require("../models/cartmodel");

let reg = async (req, res) => {
  try {
  
    console.log(req.body._id);
    let data = await usermodel.findById(req.body._id);
    if (data) {
      res.status(400).json({ msg: "given email already exists" });
    } else {
      let pwdhash = await bcrypt.hash(req.body.pwd, 10);
      let user = new usermodel({ ...req.body, pwd: pwdhash });
      await user.save();
      res.status(200).json({ msg: "account created successfully" });
    }
  } catch {
    // console.log(req.body._id);
    res.json({ msg: "error in rejistration" });
  }
};

let login = async (req, res) => {
  try {
    let data = await usermodel.findById(req.body._id);
    if (data) {
      let f = await bcrypt.compare(req.body.pwd, data.pwd);
      if (f) {
        let x=await cartmodel.find({uid:data._id})
        let count=x.length

        res
          .status(200)
          .json({
          
            "token": jwt.sign({ "_id": data._id, "role": data.role },"12345"),
            "name":data.name,
            "role":data.role,
            "uid":data._id,
            "count":count
          });
      } else {
        res.json({ msg: "invalid password" });
      }
    } else {
      res.json({ msg: "invalid email" });
    }
  } catch {
    res.json({ msg: "error in login" });
  }
};


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: "psivadurgaprsadpabbu@gmail.com",
    pass: "qtgdedcswihvmsph",
  },
});

let sendotp=async(req,res)=>{
    try{
    let obj=await usermodel.findById(req.params.eid)
    if(obj)
    {
    let otp=Math.floor(1000 + Math.random() * 9000);
    await usermodel.findByIdAndUpdate(req.params.eid,{"otp":otp})
    let info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <psivadurgaprsadpabbu@gmail.com>',
        to: req.params.eid,
        subject: "OTP for Password Reset",
        text: `Your OTP for password reset is: ${otp}`
     })
      // Plain-text version of the message
      if(info.accepted.length>0)
      {
    res.json({"msg":"OTP sent"})
      }
      else{
        res.json({"msg":"Error in sending OTP"})
      }

    }
    else{
        res.json({"msg":"No account with given email"})
    }   
}
catch{
    res.json({"err":"Error in sending OTP"})
}
}
let resetpwd=async(req,res)=>{
    try{
        let obj=await usermodel.findById(req.body.eid)
        if(obj)
        {
            if(obj.otp===req.body.otp)
            {
                let pwdhash=await bcrypt.hash(req.body.pwd,10)
                await usermodel.findByIdAndUpdate(req.body.eid,{"pwd":pwdhash,"otp":""})
                res.json({"msg":"Password reset"})
            }  
            else{
                res.json({"msg":"Invalid OTP"})
            }
        }
        else{
            res.json({"msg":"No account with given email"})
        }
    }
    catch{
        res.json({"err":"Error in resetting password"})
    }   
}
module.exports = { reg, login ,sendotp,resetpwd};
