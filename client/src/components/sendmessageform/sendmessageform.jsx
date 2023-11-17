import React from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector, useDispatch } from "react-redux";
import Picker from "emoji-picker-react";
import axios from "../../axios/axios";
import Recorder from "../reactrecorder/recorder";
import { HandleEmojiPicker } from "../../store/postslice";

export default function sendmessageform({
  Value,
  SetValue,
  roomId,
  ImageUrl,
  socket,
  SetImgUrl,
  EditedMessage,
  dispatch,
}) {
  const Ref = React.useRef(null);
  const ReduxDispatch = useDispatch();
  const [Key, SetKey] = React.useState("");
  const [Voice, SetVoice] = React.useState(false);
  const State = useSelector((state) => state.user);
  const [AudioMessage, SetAudioMessage] = React.useState(null);
  const [EmojiStyle, SetEmojiStyle] = React.useState(false);
  const [Status, SetStatus] = React.useState(null);
  const [ShowPicker, SetShowPicker] = React.useState(false);
  const onEmojiClick = (event, emojiObject) => {
    SetValue((prev) => prev + emojiObject.emoji);
  };
  async function SaveMessage(EditedMessage) {
    EditedMessage.text = Value;
    EditedMessage.roomId = roomId;
    const { data } = await axios.post("/message/edit", EditedMessage);
    SetValue("");
    dispatch({
      type: "CONNECTION",
      payload: data.newmessages,
    });
  }
  const onkey = (event) => {
    SetKey(event.key);
  };
  const ClearStates = () => {
    SetValue("");
    SetImgUrl([]);
    SetVoice(false);
    SetAudioMessage(null);
  };
  React.useEffect(() => {
    Ref.current.addEventListener("keydown", onkey);
  }, []);
  const onSubmit = async () => {
    if (EditedMessage?.isEdit) {
      SaveMessage(EditedMessage);
    } else {
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
      await socket.emit("ROOM:NEW_MESSAGE", obj);
      ClearStates();
    }
  };
  return (
    <Box
      className="SendMessage"
      sx={{
        height: 80 + "px",
        marginTop: -80 + "px",
        width: 100 + "%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={
          EmojiStyle
            ? { position: "absolute", left: 10 + "%", bottom: 1 + "%" }
            : { marginTop: 27 + "px" }
        }
      >
        <Button
          disabled={Status === "recording" ? true : false}
          sx={{
            border: "none",
            background: "none",
            color: "black",
            ":hover": {
              background: "white",
            },
          }}
          onClick={() => {
            SetEmojiStyle((val) => !val);
            ReduxDispatch(HandleEmojiPicker(!State.ShowPicker));
          }}
        >
          <EmojiEmotionsIcon style={{ cursor: "pointer" }}></EmojiEmotionsIcon>
        </Button>
        {State.ShowPicker && (
          <Picker
            autoFocusSearch={true}
            onEmojiClick={onEmojiClick}
            picketStyle={{ width: "100%", height: "50%" }}
          ></Picker>
        )}
      </Box>
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
      <Button
        disableRipple
        onClick={onSubmit}
        sx={{
          background: "none",
          border: "none",
          color: "black",
          cursor: "default",
          ":hover": {
            background: "white",
          },
        }}
      >
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
      </Button>
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
              SetImgUrl((Img) => {
                return [...Img, { src: fileReader.result, date: new Date() }];
              });
            };
            fileReader.readAsDataURL(item);
          });
        }}
      ></input>
      <label for={"imgloader"} style={{ cursor: "pointer" }}>
        <AddAPhotoIcon style={{ marginTop: 28 + "px" }}></AddAPhotoIcon>
      </label>
      <Recorder
        Voice={Voice}
        SetVoice={SetVoice}
        AudioMessage={AudioMessage}
        SetAudioMessage={SetAudioMessage}
      ></Recorder>
    </Box>
  );
}
