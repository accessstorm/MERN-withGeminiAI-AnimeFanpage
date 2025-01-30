// models/Titan.js
import mongoose from 'mongoose';

const TitanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    power: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
}
);

const Titan = mongoose.model('Titan', TitanSchema);

export default Titan;
