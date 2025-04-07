import UserModel from "../model/User.js";
import bcrypt from "bcrypt";
export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: `${!name ? 'Name' : !email ? 'Email' : !password ? 'Password' : ""} is required!`
            })
        }
        const exitUser = await UserModel.findOne({ email });
        if (exitUser) {
            return res.status(400).json(
                {
                    status: false,
                    message: "User Alredy Exist"
                })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // const user = await UserModel.create({ name, email, password })
        // second method 
        const user = await UserModel({
            name, email, password: hashPassword
        })
        await user.save();
        return res.status(201).json({
            status: true,
            user
        })
    }
    catch (e) {
        console.log("Error From User Register", e)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}
