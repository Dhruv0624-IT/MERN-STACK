import pkg from 'jsonwebtoken';
const { verify } = pkg;

export const checkUser = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.json({
                success:false,
                message:"You aren't authenticate"
            })
        }
        token = token.split(" ")[1];
        const match = verify(token, process.env.SECRET_KEY)
        if(!match){
            return res.json({ success: false, message: "Unauthorized" })
        }
        req.user = match
        next()
    } catch (error) {
        res.json(error.message)
    }
}

export const roleUser = (roles) => {
   try {
     return (req, res, next) => {
         // console.log(roles)
         const match = roles.includes(req?.user?.role)
         console.log(match)
         if(!match){
             return res.json({
                 success:true,
                 message:"You're not Authorized!"
             })
         }
         next()
     }
   } catch (error) {
    
   }
}