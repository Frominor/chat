import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import fileUpload from "express-fileupload";

import { authRouter } from "./routers/auth.js";
import { fileRouter } from "./routers/file.js";
import { RoomRouter } from "./routers/chatrooms.js";
import UserSchema from "./schema/userschema.js";
import MessageSchema from "./schema/messageschema.js";
import RoomSchema from "./schema/roomschema.js";

const app = express();
app.use(cors());
app.use(express.json());
const protocol = http;
const server = protocol.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  allowEIO3: true,
});
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use("/images", express.static("images"));
io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", async ({ roomId, userName }) => {
    socket.join(roomId);
    const room = await RoomSchema.findOne({ roomId });
    if (!room.users.includes(userName)) {
      room.users.push(userName);
      await RoomSchema.findOneAndUpdate({ roomId }, { users: room.users });
    }
    const messages = room.messages;
    socket.to(roomId).emit("ROOM:JOINED", messages);
  });
  socket.on("disconnect", () => {
    // const rooms=
    // rooms.forEach((value, roomId) => {
    //   if (value.get("users").delete(socket.id)) {
    //     const users = [...rooms.get(roomId).get("users").values()];
    //     socket.broadcast.to(roomId).emit("ROOM:LEAVE", users);
    //   }
    // });
  });
  socket.on(
    "ROOM:NEW_MESSAGE",
    async ({
      roomId,
      text,
      date,
      UserId,
      Images = [],
      AudioMessage = null,
    }) => {
      const user = await UserSchema.findById(UserId);

      const room = await RoomSchema.findOne({ roomId });
      const message = new MessageSchema({
        message: text,
        user: user._doc,
        userInfo: user._doc,
        Images: Images,
        date: date,
        AudioMessage,
      });
      await message.save();
      room.messages.push(message);
      await RoomSchema.findOneAndUpdate(
        { roomId },
        { messages: room.messages }
      );
      socket.broadcast.to(roomId).emit("ROOM:NEW_MESSAGE", message);
    }
  );
  socket.on("ROOM:DELETE_MESSAGE", async (obj) => {
    const roomId = obj.roomId;
    const room = await RoomSchema.findOne({ roomId });
    const messages = room.messages;
    const newmessages = messages.filter((item) => {
      if (obj.date !== item.date) {
        return item;
      }
    });
    await RoomSchema.findOneAndUpdate({ roomId }, { messages: newmessages });
    socket.broadcast.to(obj.roomId).emit("ROOM:DELETE_MESSAGE", newmessages);
  });
});
app.get("/rooms/:id", async (req, res) => {
  const room = await RoomSchema.findOne({ roomId: req.params.id });
  if (room) {
    res.json({ messages: room.messages, users: room.users });
  } else {
    res.json({
      messages: [],
      users: [],
    });
  }
});
app.post("/message/edit", async (req, res) => {
  const roomId = req.body.roomId;

  const room = await RoomSchema.findOne({ roomId });
  const newmessages = room.messages;
  for (let k of newmessages) {
    if (k.date === req.body.date) {
      k.message = req.body.text;
    }
  }
  await RoomSchema.findOneAndUpdate({ roomId }, { messages: newmessages });
  res.json({
    newmessages,
  });
});
app.post("/rooms", async (req, res) => {
  const { roomId, userName } = req.body;
  const room = await RoomSchema.findOne({ roomId });
  if (room) {
    return res.json(room);
  } else {
    const chatroom = new RoomSchema({
      roomId,
      users: [userName ? userName : ""],
      messages: [],
    });
    await chatroom.save();
    return res.json({
      message: "Комната создана",
      chatroom,
    });
  }
});
mongoose
  .connect("mongodb://127.0.0.1:27017/usersdb")
  .then((res) => {
    console.log("норм");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/auth", authRouter);
app.use("/chatroom", RoomRouter);
app.use("/file", fileRouter);
app.get("/", (req, res) => {
  res.json({
    message: "123321",
  });
});
server.listen(5000, (err) => {
  if (err) {
    return "Ошибка";
  } else {
    console.log("Успешно");
  }
});
