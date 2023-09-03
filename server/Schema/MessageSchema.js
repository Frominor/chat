import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      require: true,
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
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
