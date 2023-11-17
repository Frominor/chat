import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PopUp from "../popup/popup";
import axios from "../../axios/axios";
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
    <Box
      className="MessagesBox"
      sx={
        messages.length > 5
          ? {
              overflowY: "scroll",
              boxSizing: "border-box",
              minHeight: 100 + "%",
              width: 100 + "%",
              paddingBottom: 90 + "px",
            }
          : {
              overflowY: "hidden",
              boxSizing: "border-box",
              minHeight: 100 + "%",
              width: 100 + "%",
              paddingBottom: 90 + "px",
            }
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
        console.log(message?.userInfo?.email);
        console.log(message?.userInfo?.email === State?.UserInfo?.email);
        return (
          <Box
            sx={
              message?.userInfo?.email === State?.UserInfo?.email
                ? {
                    padding: 5 + "px",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 65 + "px",
                    marginBottom: 20 + "px",
                    justifyContent: "start",
                    marginTop: 10 + "px",
                    width: 90 + "%",
                    borderRadius: 20 + "px",
                    borderBottomLeftRadius: 0 + "px",
                    color: "white",
                  }
                : {
                    padding: 5 + "px",
                    display: "flex",
                    width: 90 + "%",
                    float: "right",
                    marginTop: 60 + "px",
                    marginRight: 65 + "px",
                    justifyContent: "flex-end",
                    marginBottom: 20 + "px",
                    borderRadius: 20 + "px",
                    borderBottomRightRadius: 0 + "px",
                    color: "white",
                  }
            }
          >
            <Box
              sx={
                message.userInfo.email === State.UserInfo.email
                  ? {
                      position: "absolute",
                      display: "flex",
                      flexDirection: "column",
                      left: 0.5 + "%",
                      alignItems: "center",
                    }
                  : {
                      position: "absolute",
                      display: "flex",
                      flexDirection: "column",
                      right: 0.5 + "%",
                      alignItems: "center",
                    }
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
            </Box>
            <Box
              className="MessageBox"
              sx={{
                position: "relative",
                backgroundColor: "blue",
                padding: 5 + "px",
                borderRadius:
                  message.userInfo.email === State.UserInfo.email
                    ? "20px 20px 20px 0px"
                    : "20px 20px 0px 20px",
              }}
            >
              <Typography
                variant="p"
                className="text"
                sx={{ color: "white", fontSize: 20, margin: 0 }}
              >
                {message.message}
              </Typography>
              <Box
                className="ImgMessageBox"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
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
              </Box>
              <Box className="UserNameAndDelete/Edit">
                <Typography
                  variant="span"
                  sx={{
                    fontSize: 9 + "px",
                    display: "block",
                    color: "lightgray",
                  }}
                >
                  {message.userInfo.fullName}
                </Typography>
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
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
