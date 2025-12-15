    import mongoose from "mongoose";

    export const dbconfig = () => {
        mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("Db Connected!🫡"))
        .catch(err=>console.log(err))
    }