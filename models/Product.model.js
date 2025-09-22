import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    categoryId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    quantity:{
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},{timestamps: true})

export default mongoose.model("Product", productSchema)