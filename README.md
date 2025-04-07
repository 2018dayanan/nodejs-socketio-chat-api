# Socket.IO Chat API

This is a real-time chat API built with Node.js, Express, and Socket.IO. It supports user authentication, messaging, and real-time communication using WebSockets.

##  Features
- User Authentication (`/api/auth`)
- Real-time chat with Socket.IO
- Send and receive messages instantly
- Track online users via socket connections
- REST API endpoints for managing messages

## Tech Stack
- Node.js
- Express.js
- Socket.IO
- MongoDB (for user/message data)
- dotenv (for environment configuration)

##  Installation
bash
git clone https://github.com/yourusername/socket-chat-api.git
cd socket-chat-api
npm install

## Create a .env file in the root directory and add:
PORT=8000
MONGODB_URI=your_mongodb_connection_string

## Running the Server
npm start

## API Endpoints
Auth Routes
POST /api/auth/register – Register user
POST /api/auth/login – Login user
GET /api/auth/getUsers - Get Users

Message Routes
POST /api/message/create-message
POST /api/message/get-message

## Testing
Use tools like:
- Postman for REST endpoints
- Socket.IO Client, HTML page, or frontend app for socket communication


## Author
Made with by Dayanan Chaudhary