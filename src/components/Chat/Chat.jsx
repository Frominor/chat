import React from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

import { Avatar, TextField } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Picker from "emoji-picker-react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";
export default function Chat({ users, messages, socket, roomId, dispatch }) {
  console.log(messages);
  const [Value, SetValue] = React.useState("");
  const [ShowPicker, SetShowPicker] = React.useState(false);
  const [blob, SetBlob] = React.useState(null);
  const [Status, SetStatus] = React.useState(null);
  const [EmojiStyle, SetEmojiStyle] = React.useState(false);
  const State = useSelector((state) => state.user);
  const del = async ({ text, userName, date }) => {
    const obj = {
      text,
      userName,
      roomId,
      date,
      isEdit: false,
    };
    socket.emit("ROOM:DELETE_MESSAGE", obj);
  };
  const onEmojiClick = (event, emojiObject) => {
    SetValue((prev) => prev + emojiObject.emoji);
  };

  const onSubmit = () => {
    const userName = State.UserInfo.fullName;
    const UserId = State.UserInfo._id;
    if (Value !== "") {
      const obj = {
        text: Value,
        userName,
        roomId,
        UserId,
        date: new Date(),
      };
      socket.emit("ROOM:NEW_MESSAGE", obj);
    } else {
      const obj = {
        audioMessage: blob,
        userName,
        roomId,
        UserId,
        date: new Date(),
      };
      socket.emit("ROOM:NEW_MESSAGE", obj);
    }
    SetValue("");
  };
  async function SaveMessage(message) {
    message.text = Value;
    message.roomId = roomId;
    const { data } = await axios.post(
      "http://localhost:5000/message/edit",
      message
    );
    SetValue("");
    dispatch({
      type: "CONNECTION",
      payload: data.newmessages,
    });
  }
  return (
    <div className="Chat">
      <div className="Title">
        <div className="Online">
          <h2>Онлайн: </h2>
        </div>
        <h3>Комната-{roomId}</h3>
      </div>
      <div
        className="Messages"
        style={
          messages.length > 3
            ? { overflowY: "scroll" }
            : { overflowY: "hidden" }
        }
      >
        {messages.map((message) => {
          console.log(State.UserInfo.email);
          console.log(message.userInfo.email);
          return (
            <div
              className={
                message.userInfo.email === State.UserInfo.email
                  ? "YourMessages"
                  : "OtherMessages"
              }
            >
              <div className="avatar">
                <Avatar
                  sx={
                    State.UserInfo
                      ? {
                          width: 50,
                          height: 50,
                        }
                      : {}
                  }
                  src={
                    message?.userInfo?.avatarUrl
                      ? message.userInfo.avatarUrl
                      : "/static/images/avatar/2.jpg"
                  }
                />
              </div>
              <div className="asd">
                <p className="text" style={{ color: "white" }}>
                  {message.message ? message.message : ""}
                  {message.audioMessage ? (
                    <audio controls src={message.audioMessage}></audio>
                  ) : (
                    ""
                  )}
                </p>

                <div className="UserNameAndDelete/Edit">
                  <span>{message.userInfo.fullName}</span>
                  {message.userInfo.email === State.UserInfo.email ? (
                    <button className="del" onClick={() => del(message)}>
                      Удалить
                    </button>
                  ) : (
                    ""
                  )}

                  {message.userInfo.email === State.UserInfo.email ? (
                    !message.isEdit ? (
                      <button
                        onClick={() => {
                          message.isEdit = true;
                          SetValue(message.message);
                        }}
                      >
                        Редактировать
                      </button>
                    ) : (
                      <button onClick={() => SaveMessage(message)}>
                        Сохранить
                      </button>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
            <EmojiEmotionsIcon></EmojiEmotionsIcon>
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
          value={Value}
          onChange={(e) => {
            SetValue(e.target.value);
          }}
        />
        <button
          onClick={onSubmit}
          style={{ background: "none", border: "none" }}
        >
          <SendIcon
            sx={{
              ":hover": {
                cursor: "pointer",
              },
              width: 40 + "px",
              height: 30,
              marginLeft: 2,
            }}
          ></SendIcon>
        </button>
      </div>
      <div>
        {/* <ReactMediaRecorder
          audio
          blobPropertyBag={{
            type: "audio/mp3",
          }}
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
            SetStatus(status);
            SetBlob(mediaBlobUrl);
            return (
              <div>
                <button
                  disabled={EmojiStyle}
                  className="sendAudioMessage"
                  onClick={startRecording}
                >
                  <MicIcon sx={{ width: 30 + "px", height: 30 + "px" }} />
                </button>
                {status === "recording" ? (
                  <div className="Recording">
                    <span style={{ fontSize: 20 + "px", color: "black" }}>
                      Запись....
                    </span>
                    <RadioButtonCheckedIcon
                      sx={{ color: "red" }}
                    ></RadioButtonCheckedIcon>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        marginTop: 2 + "px",
                      }}
                      onClick={() => {
                        stopRecording();
                      }}
                    >
                      <CloseIcon></CloseIcon>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          }}
        /> */}
      </div>
    </div>
  );
}
