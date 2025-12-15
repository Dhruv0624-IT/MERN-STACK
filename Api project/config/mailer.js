import { createTransport } from "nodemailer";

const transporter = createTransport({
    service:'gmail',
    auth:{
        user:"sksejalkothari18@gmail.com",
        pass:"xhsk jqlu ncsb btag"
    }
})

const sendMailer = async(to,subject,html) =>{
    const mailOption = {
        from : process.env.EMAIL_USER,
        to,subject,html
    }
    try {
        const info = await transporter.sendMail(mailOption)
        console.log(info.response)
        return true
    } catch (error) {
        return false
    }
}

export default sendMailer