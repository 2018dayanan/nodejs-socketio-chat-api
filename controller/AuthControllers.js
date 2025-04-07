import UserModel from "../model/User.js";
import bcrypt from "bcrypt";
export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password || !req.file) {

            return res.status(400).json({
                success: false,
                message: `${!name ? 'Name' : !email ? 'Email' : !password ? 'Password' : !req.file ? 'Profile picture' : ""} is required!`
            })
        }
        const BaseUrl = `${req.protocol}://${req.get("host")}`
        console.log("Base url", BaseUrl)
        const imagePath = `${BaseUrl}/images/${req.file.filename}`
        console.log(imagePath);
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
            name,
            email,
            password: hashPassword,
            profile: imagePath
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
// Login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `${!email ? 'Email' : !password ? 'Password' : ""} is required!`
            })
        }
        const exitUser = await UserModel.findOne({ email });
        if (!exitUser) {
            return res.status(404).json(
                {
                    status: false,
                    message: "User Not Found!"
                })
        }
        const isMatch = await bcrypt.compare(password, exitUser.password);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid Password"
            })
        }
        return res.status(200).json({
            status: true,
            message: "User login successfully!",
            user: exitUser
        })
    } catch (e) {
        console.log("Error From User Login", e)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error!"
        })
    }
}