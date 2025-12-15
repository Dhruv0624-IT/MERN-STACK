import { model, Schema } from "mongoose";
import { common } from "../utils/common.js";

const userSchema = new Schema({
    username: common,
    email: {
        ...common,
        unique:[true, "Email id already exist!"]
    },
    password: common,
    otp: {
        ...common,
    },
    verify:{
        ...common,
        type:Boolean,
        default:false
    },
    user_profile:{
        ...common,
        required:false
    },
    user_role:{
        ...common,
        default:"Member",
        enum:["Admin", "Manager", "Librarian", "Member"]
    }
},{timestamps:true})

export const User = model('User', userSchema)