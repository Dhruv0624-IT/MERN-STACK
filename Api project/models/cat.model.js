import { Schema, model } from "mongoose";
import { common } from "../utils/common.js";

const catSchema = new Schema({
    name:{
        ...common,
        unique:true
    }
},{timestamps:true})

export const Category = model('Category', catSchema)