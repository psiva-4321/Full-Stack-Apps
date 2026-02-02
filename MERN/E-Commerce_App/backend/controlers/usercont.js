const um = require("../models/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")

let adduser=async(req,res)=>{
    try{
        let data=await um.findById(req.body._id)
        if(data)
        {
            res.json({"msg":"With given email acc exists"})
        }
        else{

            let pwdhash=await bcrypt.hash(req.body.pwd,10)
            let user=new um({...req.body,"pwd":pwdhash})
            await user.save()
            res.json({"msg":"acc reated"})
        }

    }
    catch{
        res.json({"err":"Error in Registration"})
    }
}

let login=async(req,res)=>{
    try{
        let data=await um.findById(req.body._id)
        if(data)
        {
            let f=await bcrypt.compare(req.body.pwd,data.pwd)
            if(f)
            {
                res.json({"token":jwt.sign({"_id":data._id},"12345"),"uid":data._id,"name":data.name,"role":data.role})
            }
            else{
                 res.json({"msg":"check pwd"})

            }

        }
        else{
            res.json({"msg":"check email"})
        }

    }
     catch{
        res.json({"err":"Error in Login"})
    }
}

module.exports={login,adduser}