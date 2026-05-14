// models/BanerImg.js

import mongoose from 'mongoose';

const BanerImgSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.BanerImg || mongoose.model('BanerImg', BanerImgSchema);
