import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String || Object,
    },
    date: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userInfo: {
      type: Object,
    },
    Images: {
      type: Object,
    },
    AudioMessage: {
      type: Object || String,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
