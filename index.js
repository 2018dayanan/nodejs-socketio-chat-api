import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/Auth.js';
import DbCon from './utlis/db.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import MessageRoute from './routes/messageRoute.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
DbCon();
app.use(express.static('public'));
app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoute);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});



let users = []
const Addusers = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
}
const ReomveUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}
const GetUser = (userId) => {
    return users.find((user) => user.userId === userId)
}
io.on('connection', (socket) => {
    // when connected
    console.log('a user connected', socket.id)
    socket.on('AddUserSocket', (userId) => {
        console.log('userid', userId)
        Addusers(userId, socket.id)
        io.emit('getUsers', users)
        console.log('usersfromscoket', users)

    })
    // message
    socket.on('sendMessage', (data) => {
        const { senderId, receiverId, message } = data.messagedata;
        console.log('revierId', receiverId)
        const user = GetUser(receiverId);
        console.log('senderUser', user)
        if (user?.socketId) {
            io.to(user.socketId).emit('receiveMessage', {
                userId: senderId,
                message,
            });
        } else {
            console.log('Receiver not connected');
        }
        console.log('messagedata', data);
    });

    // when desction
    socket.on('disconnect', () => {
        console.log('a user disconnected')
        ReomveUser(socket.id)
        io.emit('getUsers', users)
        console.log(users)
    })
})
app.listen(PORT, () => { console.log("Server is running on port", PORT) });