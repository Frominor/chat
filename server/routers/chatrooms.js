import { Router } from "express";
import RoomSchema from "../Schema/RoomSchema.js";
export const RoomRouter = Router();
RoomRouter.post("/create", async (req, res) => {
  const roomId = req.body.name;
  const chatRoomExist = await RoomSchema.findOne({ roomId });
  if (chatRoomExist) {
    return res.json({
      message: "Комната уже есть",
    });
  }
  const chatroom = new RoomSchema({
    roomId,
  });
  await chatroom.save();
  res.json({
    message: "Комната создана",
    roomId,
  });
});
