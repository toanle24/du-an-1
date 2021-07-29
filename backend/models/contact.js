import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },

    content: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    photo:{
        data: Buffer,
        contentType: String, 
    },
 


}, { timestamps: true })


module.exports = mongoose.model("Contact", contactSchema)