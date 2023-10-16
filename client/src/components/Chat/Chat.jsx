import React from "react";
import "./Chat.css";
import Recorder from "../ReactRecorder/Recorder";
import Message from "../Message/Message";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import PreloaderMessages from "../PreloaderMessages/PreloaderMessages";
export default function Chat({ messages, socket, roomId, dispatch }) {
  const [ImageUrl, SetImgUrl] = React.useState([]);

  const [Value, SetValue] = React.useState("");
  return (
    <div className="Chat">
      <div className="Title">
        <h3>Комната-{roomId}</h3>
      </div>
      <Message
        messages={messages}
        roomId={roomId}
        socket={socket}
        dispatch={dispatch}
        Value={Value}
        SetValue={SetValue}
      />
      <SendMessageForm
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
      <div className="container"></div>
    </div>
  );
}
