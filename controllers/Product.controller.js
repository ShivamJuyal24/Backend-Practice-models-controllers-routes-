import Product from "../models/Product.model.js"
import Category from "../models/Category.model.js"

export const getProductByCategory = async (req, res)=>{
    try{
        const {CategoryName}= req.params;
        const category = await Category.findOne({name:CategoryName});

        if(!category)return res.status(400).json({ message:"Category not found"});

        const products = await Product.find({categoryId :category._id});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({ message: "Server error"});
    }
}