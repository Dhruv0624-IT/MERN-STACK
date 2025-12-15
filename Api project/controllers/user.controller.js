import sendMailer from "../config/mailer.js";
import { User } from "../models/user.model.js";
import { CreateModel, SingleModel, SingleModelId, UpdateModel, UpdateModelId } from "../utils/api.model.js";
import { hashToPlain, plainToHash } from "../utils/password.js"
import { generate } from "otp-generator";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    const hash_pass = await plainToHash(password);
    const otp = generate(6, { specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false })
    const result = await CreateModel(User, { username, email, password: hash_pass, otp }, "User Created!")
    if (result.success) {
        const response = await sendMailer(email, "Verify your Account!", `<h1>${otp}</h1>`)
        if (response) {
            res.json(result)
        }
    } else {
        res.json(result);
    }
}

export const verifyUser = async (req, res) => {
    const { email, otp } = req.body;
    const response = await SingleModel(User, { email, otp }, "Email or OTP is not Correct!")
    if (response.success) {
        const response = await UpdateModel(User, { email }, { otp: "", verify: true }, "Your Account is Verified!")
        if (response) {
            res.json(response)
        }
    } else {
        res.json(response)
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body
    const response = await SingleModel(User, { email }, "Email id doesnot exist!")
    if (response.success) {
        const match = await hashToPlain(password, response?.record?.password)
        if (!match) {
            return res.json({ success: false, message: "Password incorrect!" })
        } else {
            const payload = {
                id: response?.record?._id,
                email: response?.record?.email
            }
            const token = sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
            console.log(token)
            res
                .header('token', token)
                .json({
                    success: true,
                    message: "Login Successfully",
                    token
                })
        }
    } else {
        res.json(response)
    }
}

export const profile = async (req, res) =>{
   try {
     const {id} = req.user
     const{username} = req.body
     // console.log(req.file)
     const response = await SingleModelId(User, id,"-password -otp", "You're not User")
     if(response.success){
         const response = await UpdateModelId(User, id, {username, user_profile:req?.file?.filename}, "Your profile has been updated!")
         res.json(response)
     }
   } catch (error) {
    res.json(error)
   }
}

export const changepassword = async (req, res) =>{
    const { old_pass, new_pass } = req.body
    const {id} = req.user
    // console.log(id)
    const response = await SingleModelId(User, id,"password", "You're not Authorized")
    // console.log(response)
    if(response){
        const match = await hashToPlain(old_pass,response?.record?.password)
        if(!match){
            return res.json({success:false, message:"Your old password is incorrect"})
        }
    }
    const hash_pass = await plainToHash(new_pass)
    // console.log(hash_pass)
    const result = await UpdateModelId(User, id, {password:hash_pass}, "Your password has been updated!")
    res.json(result)
}