import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    productId:{
          type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type:Number
    },
    price:{
        type:Number
    }
})

export default mongoose.model("OrderItem",orderItemSchema)