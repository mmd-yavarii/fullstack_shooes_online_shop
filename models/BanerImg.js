// models/BanerImg.js
import mongoose from 'mongoose';

const BanerImgSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.BanerImg || mongoose.model('BanerImg', BanerImgSchema);
