let multer= require('multer');
let productmodel = require('../models/productmodel');
let{v4:uuidv4}= require('uuid');
let fs= require('fs');
let storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./prodimgs');
    },
    filename: function(req,file,cb){
        const uniqueSuffix= Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix +"."+file.mimetype.split('/')[1]);
    }
});
const upload= multer({storage: storage})
let addproduct= async(req,res)=>{
    try{
        let product= new productmodel({...req.body,"img":req.file.filename,"_id":uuidv4()});
        await product.save();
        res.json({"msg":"product added successfully"});

    }catch{
        res.json({"msg":"error in adding product"});
    }
}
let getproducts= async(req,res)=>{
    try{
        let data= await productmodel.find();
        res.json(data);
    }catch{
        res.json({"msg":"error in getting products"});
    }
}
let getproductbyid= async(req,res)=>{
    try{
        let data= await productmodel.findById(req.params.id);
        res.json(data);
    }catch{
        res.json({"msg":"error in getting product"});
    }
}
let getprodbycategory= async(req,res)=>{
    try{
        let data= await productmodel.find({"category":req.params.category});
        res.status(200).json(data);
    }catch{
        res.json({"msg":"error in getting products"});
    }
}
let updateproductimg= async(req,res)=>{
    try{
        let data= await productmodel.findByIdAndDelete({"_id":req.body._id},{"img":req.file.filename});
        fs.rm(`./prodimgs/${data.img}`,()=>{});
        res.json({"msg":"product image updated successfully"});
    }catch{
        res.json({"msg":"error in updating product image"});
    }
}

    
let updateproduct= async(req,res)=>{
    try{
        await productmodel.findByIdAndUpdate({"_id":req.body._id},req.body);
        res.json({"msg":"product updated successfully"});
    }catch{
        res.json({"msg":"error in updating product"});
    }
}
let searchprod= async(req,res)=>{
    try{
        let prods=await productmodel.find({"title":new RegExp(req.params.title,"i")});
        res.json(prods);
    }catch{
        res.json({"msg":"error in searching products"});
    }
}
let deleteprod= async(req,res)=>{
    try{
        let data= await productmodel.findByIdAndDelete(req.params.id);
        fs.rm(`./prodimgs/${data.img}`,()=>{});
        res.json({"msg":"product deleted successfully"});
    }

    catch{
        res.json({"msg":"error in deleting product"});
    }
}   



module.exports={upload,addproduct,getproducts,getproductbyid,getprodbycategory,updateproduct,searchprod,updateproductimg,deleteprod};
