const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/servicesDB").then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Service Schema
const serviceSchema = new mongoose.Schema({
    // "_id": Number,
    "name": String,
    "place": String,
    "type": String,
    "experience": Number,
    "phone": String,
    "price": Number,
    "rating": Number
});

// Model
const Service = mongoose.model("Service", serviceSchema);



// app.get("/category", (req, res) => {
//     const { type } = req.query;
//     Service.find({ type: type }).then((data) => {
//         res.json(data);
//     }).catch((err) => {
//         res.status(500).json({ msg: "error", err });
//     });
// });

app.get("/category/:type", (req, res) => {
    const { type } = req.params;
    Service.find({ type }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ msg: "Server error", err });
    })
})



app.get("/api/add-sample-data", async (req, res) => {
    try {
        const sampleServices = [
            // 10 plumbers
            {  name: "Kiran", place: "Hyderabad", type: "plumber", experience: 5, phone: "45612", price: 650, rating: 4.2 },
            {  name: "Ramesh", place: "Bangalore", type: "plumber", experience: 7, phone: "78945", price: 700, rating: 4.5 },
            {  name: "Suresh", place: "Chennai", type: "plumber", experience: 4, phone: "12378", price: 600, rating: 4.0 },
            {  name: "Anil", place: "Delhi", type: "plumber", experience: 6, phone: "98712", price: 650, rating: 4.3 },
            {  name: "Vikram", place: "Mumbai", type: "plumber", experience: 5, phone: "54321", price: 680, rating: 4.1 },
            {  name: "Rohit", place: "Pune", type: "plumber", experience: 3, phone: "11223", price: 620, rating: 4.0 },
            {  name: "Mahesh", place: "Kolkata", type: "plumber", experience: 8, phone: "33445", price: 750, rating: 4.6 },
            {  name: "Arjun", place: "Hyderabad", type: "plumber", experience: 2, phone: "55678", price: 580, rating: 3.9 },
            {  name: "Sanjay", place: "Bangalore", type: "plumber", experience: 5, phone: "66789", price: 640, rating: 4.2 },
            {  name: "Pradeep", place: "Chennai", type: "plumber", experience: 6, phone: "77890", price: 670, rating: 4.4 },

            // 10 electricians
            { name: "Deepak", place: "Delhi", type: "electrician", experience: 7, phone: "99887", price: 500, rating: 4.5 },
            { name: "Manoj", place: "Mumbai", type: "electrician", experience: 5, phone: "88776", price: 450, rating: 4.1 },
            { name: "Siddharth", place: "Bangalore", type: "electrician", experience: 6, phone: "77665", price: 480, rating: 4.3 },
            { name: "Rajan", place: "Hyderabad", type: "electrician", experience: 4, phone: "66554", price: 470, rating: 4.0 },
            { name: "Ajay", place: "Pune", type: "electrician", experience: 3, phone: "55443", price: 430, rating: 3.9 },
            { name: "Nikhil", place: "Chennai", type: "electrician", experience: 6, phone: "44332", price: 490, rating: 4.2 },
            { name: "Vikas", place: "Delhi", type: "electrician", experience: 5, phone: "33221", price: 460, rating: 4.1 },
            { name: "Harish", place: "Mumbai", type: "electrician", experience: 4, phone: "22110", price: 450, rating: 4.0 },
            { name: "Suresh", place: "Bangalore", type: "electrician", experience: 7, phone: "11009", price: 500, rating: 4.4 },
            { name: "Rohit", place: "Hyderabad", type: "electrician", experience: 5, phone: "00988", price: 470, rating: 4.3 },

            // 10 carpenters
            { name: "Ramesh", place: "Pune", type: "carpenter", experience: 6, phone: "55678", price: 800, rating: 4.4 },
            { name: "Kumar", place: "Delhi", type: "carpenter", experience: 5, phone: "66789", price: 750, rating: 4.2 },
            { name: "Manish", place: "Mumbai", type: "carpenter", experience: 7, phone: "77890", price: 820, rating: 4.5 },
            { name: "Arun", place: "Bangalore", type: "carpenter", experience: 4, phone: "88901", price: 700, rating: 4.0 },
            { name: "Vikram", place: "Hyderabad", type: "carpenter", experience: 6, phone: "99012", price: 780, rating: 4.3 },
            { name: "Sanjay", place: "Chennai", type: "carpenter", experience: 5, phone: "10123", price: 740, rating: 4.1 },
            { name: "Rohit", place: "Delhi", type: "carpenter", experience: 4, phone: "11234", price: 710, rating: 4.0 },
            { name: "Mahesh", place: "Mumbai", type: "carpenter", experience: 6, phone: "12345", price: 790, rating: 4.4 },
            { name: "Anil", place: "Bangalore", type: "carpenter", experience: 5, phone: "23456", price: 760, rating: 4.2 },
            { name: "Ajay", place: "Hyderabad", type: "carpenter", experience: 7, phone: "34567", price: 820, rating: 4.5 },

            // 10 painters
            {name: "Neha", place: "Pune", type: "painter", experience: 3, phone: "55678", price: 400, rating: 4.0 },
            {name: "Pooja", place: "Delhi", type: "painter", experience: 4, phone: "66789", price: 420, rating: 4.2 },
            {name: "Sneha", place: "Mumbai", type: "painter", experience: 5, phone: "77890", price: 450, rating: 4.3 },
            {name: "Ritika", place: "Bangalore", type: "painter", experience: 3, phone: "88901", price: 400, rating: 4.1 },
            {name: "Ankita", place: "Hyderabad", type: "painter", experience: 4, phone: "99012", price: 420, rating: 4.2 },
            {name: "Swati", place: "Chennai", type: "painter", experience: 5, phone: "10123", price: 450, rating: 4.3 },
            {name: "Riya", place: "Delhi", type: "painter", experience: 4, phone: "11234", price: 430, rating: 4.1 },
            {name: "Sakshi", place: "Mumbai", type: "painter", experience: 3, phone: "12345", price: 400, rating: 4.0 },
            {name: "Tanya", place: "Bangalore", type: "painter", experience: 5, phone: "23456", price: 450, rating: 4.3 },
            {name: "Neelam", place: "Hyderabad", type: "painter", experience: 4, phone: "34567", price: 430, rating: 4.2 }
        ];

        // Clear existing data first (optional)
        // await Service.deleteMany({});

        // Insert all sample data
        await Service.insertMany(sampleServices);

        res.send("All sample service data added!");
    } catch (err) {
        // res.status(500).send(err.message);
        console.log("Error in adding the data")
    }
});


app.post("/add", (req, res) => {
    let data = new Service(req.body)
    console.log(req.body);
    data.save().then(() => {
        res.json({ "msg": "Data added succesfully" })
    }).catch(() => {
        res.json({ "msg": "error" })
    })
})

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
