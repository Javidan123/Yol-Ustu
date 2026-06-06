import mongoose from "mongoose";

const DishSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: [30, 'Title cannot exceed 30 characters'],
        },
        price: {
            type: String,
            required: true,
            trim: true,
        },
        img: {
            type: String,
            required: true,
        },
        createAt: {
            type: Date,
            default: Date.now,
        }
    },
    { versionKey: false }
)

DishSchema.index({ name: -1 })

export default mongoose.model('Dish', DishSchema);



