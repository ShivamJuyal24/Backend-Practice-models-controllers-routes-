import Order from "../models/Order.model.js";
import OrderItem from "../models/OrderItem.model.js"
import User from "../models/User.model.js"

export const allOrderByUser = async (req, res)=>{
    try{
        const {userId} = req.params;
    const user = await User.findById(userId);

    if(!user)return res.status(400).json({message:"User not found."});

    const orders = await Order.find({userId}).sort({createdAt:-1});
    
    if(!orders || orders.length===0){
        return res.status(404).json({message:"No orders found"});
    }

    const detailedOrder = await Promise.all(
        orders.map(async(order)=>{
            const items = await OrderItem.find({orderId: order._id})
            .populate('productId','name price description');

            return{
                ...order.toObject(),
                items,

            };
        })
    );
    return res.status(200).json({
        success:true,
        count: detailedOrder.length,
        orders: detailedOrder,

    })
    }catch(error){
        res.status(500).json({message:"Server error"});
    }
}

export const totalOrderAmount = async (req,res)=>{
   try{
     const {orderId}= req.params;
    const order = await Order.findById(orderId);
    if(!order)return res.status(404).json({message:"Order not found"});

    const orderItems = await OrderItem.find({orderId: order._id});

    let totalAmount =0;
    orderItems.forEach((item)=>{
        totalAmount+=item.price*item.quantity;
    })

    res.status(200).json({
        success: true,
        orderId,
        totalAmount
   })
   }catch(error){
    res.status(500).json({message:"Server error"})
   }
}

export const cancelOrder = async(req, res)=>{
    try{
        const {orderId} = req.params;
        const order = await Order.findById(orderId);

        if(!order)res.status(404).json({message: "Order not found"});

        if(order.status ==="Delivered"){
            res.status(400)
            .json({
                message:"Delivered order cannot be cancelled"
            })
        }

        order.status = "cancelled"
        await order.save();

        return res.status(200).json({
            success:true,
            message:"Order Cancelled",
            order
        })

    }catch(error){
        res.status(500).json({message:"Server error"})

    }
}