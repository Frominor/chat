import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    require: true,
  },
  users: {
    type: Array,
  },
  messages: {
    type: Array,
  },
});
export default mongoose.model("Chatroom", RoomSchema);
