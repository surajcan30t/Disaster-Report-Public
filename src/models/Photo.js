import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    
    img: {
        required: true,
        type: String,
        
    },
    lat: {
        required: true,
        type: Number,
        
    },
    lng: {
        required: true,
        type: Number,
        
    },
    
},{timestamps: true});

export default mongoose.models.Photo || mongoose.model('Photo', photoSchema)
