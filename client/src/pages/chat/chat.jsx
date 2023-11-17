import React from "react";
import MessagesBox from "../../components/messagebox/messagebox";
import SendMessageForm from "../../components/sendmessageform/sendmessageform";
import PreloaderMessages from "../../components/preloadermessages/preloadermessages";
import { Box, Typography } from "@mui/material";
export default function Chat({ messages, socket, roomId, dispatch }) {
  const [ImageUrl, SetImgUrl] = React.useState([]);
  const [EditedMessage, SetEditedMessage] = React.useState(null);
  const [Value, SetValue] = React.useState("");
  return (
    <Box
      className="Chat"
      sx={{
        width: 99.9 + "%",
        height: 78 + "vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 13 + "px",
      }}
    >
      <Box className="Title" sx={{ width: 100 + "%", textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ margin: 0, fontSize: 20, color: "brown", marginTop: 20 + "px" }}
        >
          Комната-{roomId}
        </Typography>
      </Box>
      <MessagesBox
        EditedMessage={EditedMessage}
        SetEditedMessage={SetEditedMessage}
        messages={messages}
        roomId={roomId}
        socket={socket}
        dispatch={dispatch}
        Value={Value}
        SetValue={SetValue}
      />
      <SendMessageForm
        dispatch={dispatch}
        EditedMessage={EditedMessage}
        SetEditedMessage={SetEditedMessage}
        Value={Value}
        socket={socket}
        SetValue={SetValue}
        roomId={roomId}
        ImageUrl={ImageUrl}
        SetImgUrl={SetImgUrl}
      ></SendMessageForm>
      <PreloaderMessages
        ImageUrl={ImageUrl}
        SetImgUrl={SetImgUrl}
      ></PreloaderMessages>
    </Box>
  );
}
