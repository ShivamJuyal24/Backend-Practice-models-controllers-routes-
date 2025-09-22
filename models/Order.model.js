
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    date:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        enum:["pending", "cancelled","Delivered"]
    }
},{timestamps: true})

export default mongoose.model("Order",orderSchema)