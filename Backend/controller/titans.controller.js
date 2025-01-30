import Titan from "../models/titans.model.js";
import mongoose from "mongoose";
export const gettitans = async (req, res) => {
    try {
        const titans = await Titan.find({});
        res.status(200).json({ success: true, data: titans });
    } catch (error) {
        console.log("Error in fetching Titans: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const createtitans = async (req, res) => {
    const titans = req.body; // Data sent by the client
    if (!titans.name || !titans.power || !titans.image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newTitan = new Titan(titans); // Create a new Titan document
    try {
        await newTitan.save(); // Save to MongoDB
        res.status(201).json({ success: true, data: newTitan });
    } catch (error) {
        console.error("Error in creating Titan: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deletetitans = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Titan ID" });
    }

    try {
        await Titan.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Titan deleted successfully"});
    } catch (error) {
        console.log("Error in deleting Titan: ", error.message);
        res.status(500).json({success: false, message: "Titan not found"});
        }
};

export const updatetitans =  async (req, res) => {
    const {id} = req.params;
    const titans = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Titan ID" });
    }
    try {
        const updatedTitan = await Titan.findByIdAndUpdate(id, titans, {new: true});
        res.status(200).json({success: true, message: "Titan updated successfully"});
    } catch (error) {
        console.log("Error in updating Titan: ", error.message);
        res.status(500).json({success: false, message: "Titan Angry"});
        }
};

