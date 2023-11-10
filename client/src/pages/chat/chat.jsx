import React from "react";
import "./chat.css";
import MessagesBox from "../../components/messagebox/messagebox";
import SendMessageForm from "../../components/sendmessageform/sendmessageform";
import PreloaderMessages from "../../components/preloadermessages/preloadermessages";
export default function Chat({ messages, socket, roomId, dispatch }) {
  const [ImageUrl, SetImgUrl] = React.useState([]);
  const [EditedMessage, SetEditedMessage] = React.useState(null);
  const [Value, SetValue] = React.useState("");
  return (
    <div className="Chat">
      <div className="Title">
        <h3>Комната-{roomId}</h3>
      </div>
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
    </div>
  );
}
