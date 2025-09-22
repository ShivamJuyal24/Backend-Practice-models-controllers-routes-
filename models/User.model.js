import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }

},{timestamps: true});

userSchema.pre("save", async function (next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordCorrect = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model("User",userSchema)