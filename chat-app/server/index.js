const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const socket = require('socket.io');
require('dotenv').config();
const userRouter = require('./controller/users');
const messageRouter = require('./controller/messages');


app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Database connected')
    }).catch(err => {
      console.error(err)
    })

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

const io = socket(server, {
    origins:"http://localhost:3000/chat",
    credentials: true
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on('send-message', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('receive-message', data.message);
        }
    })

    socket.on('disconnect', () => {})
})