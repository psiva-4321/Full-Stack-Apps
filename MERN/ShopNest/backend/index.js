let mongoose=require("mongoose");
let express=require("express");
let cors=require("cors");
let rt=require("./routes/rt");
mongoose.connect("mongodb://localhost:27017/shopping").then(()=>{
    console.log("connected to database");
}
)
let app=express();
app.listen(5000)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/pimgs",express.static('./prodimgs'));
app.use("/",rt);
