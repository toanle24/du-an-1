import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 300
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


module.exports = mongoose.model("News", newsSchema)