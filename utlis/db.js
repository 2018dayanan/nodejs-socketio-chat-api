import mongoose from "mongoose";

const DbCon = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected")
    } catch (error) {
        console.log("Error in Db Connection");
    }
}

export default DbCon;