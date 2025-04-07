import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/Auth.js';
import DbCon from './utlis/db.js';
import MessageRoute from './routes/messageRoute.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
DbCon();
app.use(express.static('public'));
app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoute);

app.listen(PORT, () => { console.log("Server is running on port", PORT) });