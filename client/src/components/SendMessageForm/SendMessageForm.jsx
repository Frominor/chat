import React from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useSelector } from "react-redux";
import axios from "axios";
import Picker from "emoji-picker-react";
import "./SendMessageForm.css";
import Recorder from "../ReactRecorder/Recorder";
export default function SendMessageForm({
  Value,
  SetValue,
  roomId,
  ImageUrl,
  socket,

  SetImgUrl,
}) {
  const Ref = React.useRef(null);
  const [Key, SetKey] = React.useState("");
  const State = useSelector((state) => state.user);
  const [AudioMessage, SetAudioMessage] = React.useState(null);
  const [EmojiStyle, SetEmojiStyle] = React.useState(false);
  const [Status, SetStatus] = React.useState(null);
  const [ShowPicker, SetShowPicker] = React.useState(false);
  React.useEffect(() => {
    Ref.current.addEventListener("keydown", onkey);
  }, []);
  const onEmojiClick = (event, emojiObject) => {
    SetValue((prev) => prev + emojiObject.emoji);
  };
  const onkey = (event) => {
    SetKey(event.key);
  };
  React.useEffect(() => {
    Ref.current.addEventListener("keydown", onkey);
  }, []);
  const onSubmit = async () => {
    const userName = State.UserInfo.fullName;
    const UserId = State.UserInfo._id;
    if (Value == "") {
      if (AudioMessage == null) {
        if (ImageUrl.length == 0) {
          return;
        }
      }
    }
    const obj = {
      text: Value,
      userName,
      AudioMessage,
      roomId,
      Images: ImageUrl,
      UserId,
      date: new Date(),
    };
    console.log(obj);
    await socket.emit("ROOM:NEW_MESSAGE", obj);
    SetValue("");
    SetImgUrl([]);
  };
  return (
    <div className="SendMessage">
      <div className={EmojiStyle ? "MovedEmoji" : "Emoji"}>
        <button
          disabled={Status === "recording" ? true : false}
          style={{ border: "none", background: "none" }}
          onClick={() => {
            SetEmojiStyle((val) => !val);
            SetShowPicker((val) => !val);
          }}
        >
          <EmojiEmotionsIcon style={{ cursor: "pointer" }}></EmojiEmotionsIcon>
        </button>
        {ShowPicker && (
          <Picker
            autoFocusSearch={true}
            onEmojiClick={onEmojiClick}
            picketStyle={{ width: "100%", height: "50%" }}
          ></Picker>
        )}
      </div>
      <TextField
        id="standard-multiline-static"
        label="Сообщение"
        multiline
        sx={{ width: 500 + "px" }}
        rows={1}
        variant="standard"
        ref={Ref}
        value={Value}
        onChange={(e) => {
          if (Key == "Enter") {
            onSubmit();
          } else {
            SetValue(e.target.value);
          }
        }}
      />
      <button onClick={onSubmit} style={{ background: "none", border: "none" }}>
        <SendIcon
          sx={{
            ":hover": {
              cursor: "pointer",
            },
            width: 40 + "px",
            height: 30,
            marginLeft: 0 + "px",
            marginTop: 30 + "px",
          }}
        ></SendIcon>
      </button>
      <input
        id="imgloader"
        type="file"
        multiple
        accept=".png,.jpeg,.jpg,.gif"
        style={{ display: "none" }}
        onChange={(e) => {
          e.preventDefault();
          const arr = Array.from(e.target.files);
          arr.forEach((item) => {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
              console.log(ImageUrl);
              SetImgUrl((Img) => {
                return [...Img, { src: fileReader.result, date: new Date() }];
              });
            };
            fileReader.readAsDataURL(item);
          });
        }}
      ></input>
      <label for={"imgloader"}>
        <AddAPhotoIcon style={{ marginTop: 28 + "px" }}></AddAPhotoIcon>
      </label>
      <Recorder
        AudioMessage={AudioMessage}
        SetAudioMessage={SetAudioMessage}
      ></Recorder>
    </div>
  );
}
