import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("liên kết DB thành công");
    }
    catch(error){
        console.error("Không thể kết nối csdl:",error);
        process.exit(1);
    }
};