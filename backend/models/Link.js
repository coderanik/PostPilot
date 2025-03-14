import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    title: { 
        type: String, 
        required: true, 
        default: "", 
        set: (title) => (typeof title === "object" ? JSON.stringify(title) : title) 
    },
    createdAt: { type: Date, default: Date.now }
});

const Link = mongoose.model('Link', linkSchema);

export default Link;
