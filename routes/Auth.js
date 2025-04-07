import express from 'express'
import { Login, Register } from '../controller/AuthControllers.js';
import upload from '../middleware/multer.js';
const AuthRoutes = express.Router();

AuthRoutes.post("/register", upload.single('profile'), Register);
AuthRoutes.post("/login",Login);


export default AuthRoutes;