import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes';
import dbClient from './utils/db';

const port = 5000;
const app = express();
const socket = require("socket.io");

app.use(cookieParser());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(router);

dbClient.client
  .then(() =>
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    })
  )
  .catch(() => console.log('DB not connected'));

 // integrating front end and  backend with socket.io

 const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (user_id) => {
    onlineUsers.set(user_id, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
