import { useState } from "react";
import axios from "axios";

const AddService = () => {
    const [form, setForm] = useState({
        // "_id": "",
        "name": "",
        "place": "",
        "type": "",
        "experience": "",
        "phone": "",
        "price": "",
        "rating": ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/add", {
                ...form,
                experience: Number(form.experience),
                price: Number(form.price),
                rating: Number(form.rating),
            });

            alert("Service added successfully!");
            console.log("Added service:", form);
            setForm({
                // "_id": "",
                "name": "",
                "place": "",
                "type": "",
                "experience": "",
                "phone": "",
                "price": "",
                "rating": ""
            });
        } catch (err) {
            alert("Error adding service");
        }
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h2>Add New Service</h2>
            
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="place" placeholder="Place" value={form.place} onChange={handleChange} required />
            <input name="type" placeholder="Type (plumber)" value={form.type} onChange={handleChange} required />
            <input name="experience" type="number" placeholder="Experience" value={form.experience} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
            <input name="rating" type="number" min="1" max="5" placeholder="Rating" value={form.rating} onChange={handleChange} />

            <button type="submit">Add Service</button>
        </form>
    );
};

export default AddService;
