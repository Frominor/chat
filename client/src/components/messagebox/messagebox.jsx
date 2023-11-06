import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import PopUp from "../popup/popup";
import axios from "../../axios/axios";
import "./messagesbox.css";
export default function Message({
  messages,
  roomId,
  socket,
  dispatch,
  SetValue,
  Value,
  SetEditedMessage,
}) {
  const [PopUpActive, SetPopUpActive] = React.useState(false);
  const [ScaledImgSrc, SetScaledImgSrc] = React.useState(null);
  const State = useSelector((state) => state.user);
  const del = ({ text, userName, date }) => {
    const obj = {
      text,
      userName,
      roomId,
      date,
      isEdit: false,
    };
    socket.emit("ROOM:DELETE_MESSAGE", obj);
  };

  async function SaveMessage(message) {
    message.text = Value;
    message.roomId = roomId;
    const { data } = await axios.post("/message/edit", message);
    SetValue("");
    dispatch({
      type: "CONNECTION",
      payload: data.newmessages,
    });
  }
  const OpenPopUp = (src) => {
    SetScaledImgSrc(src);
    SetPopUpActive(true);
  };
  return (
    <div
      className="MessagesBox"
      style={
        messages.length > 5 ? { overflowY: "scroll" } : { overflowY: "hidden" }
      }
    >
      {PopUpActive && (
        <PopUp
          PopUpActive={PopUpActive}
          SetPopUpActive={SetPopUpActive}
          url={ScaledImgSrc}
          SetScaledImgSrc={SetScaledImgSrc}
        ></PopUp>
      )}
      {messages.map((message) => {
        return (
          <div
            className={
              message.userInfo.email === State.UserInfo.email
                ? "YourMessage"
                : "OtherMessage"
            }
          >
            <div
              className={
                message.userInfo.email === State.UserInfo.email
                  ? "YourAvatar"
                  : "OtherAvatar"
              }
            >
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
            <div className="MessageBox">
              <p className="text" style={{ color: "white" }}>
                {message.message}
              </p>
              <div className="ImgMessageBox">
                {message.Images?.map((item) => {
                  return (
                    <img
                      onClick={() => OpenPopUp(item.src)}
                      src={item.src}
                      style={{
                        width: 100 + "%",
                        borderRadius: 10 + "px",
                        height: 70 + "px",
                        cursor: "pointer",
                      }}
                    ></img>
                  );
                })}
                {message.AudioMessage && (
                  <audio src={message.AudioMessage} controls></audio>
                )}
              </div>
              <div className="UserNameAndDelete/Edit">
                <span>{message.userInfo.fullName}</span>
                {message.userInfo.email === State.UserInfo.email ? (
                  <Button
                    sx={{ marginRight: 6 + "px", padding: 5 + "px" }}
                    variant="contained"
                    className="del"
                    onClick={() => del(message)}
                  >
                    Удалить
                  </Button>
                ) : (
                  ""
                )}

                {message.userInfo.email === State.UserInfo.email ? (
                  message.Images.length == 0 ? (
                    <Button
                      sx={{ marginRight: 6 + "px", padding: 5 + "px" }}
                      variant="contained"
                      onClick={() => {
                        if (message.isEdit) {
                          SaveMessage(message);
                        } else {
                          messages.forEach((item) => {
                            item.isEdit = false;
                          });
                          message.isEdit = true;
                          SetValue(message.message);
                          SetEditedMessage(message);
                        }
                      }}
                    >
                      {message.isEdit ? "Сохранить" : "Редактировать"}
                    </Button>
                  ) : (
                    ""
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
  );
}
