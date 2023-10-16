import React from "react";
import { ReactMic } from "react-mic";
export default function Recorder({ AudioMessage, SetAudioMessage }) {
  const [Voice, SetVoice] = React.useState(false);
  const OnStop = (blob) => {
    SetAudioMessage(blob.blobURL);
  };
  const StartHandle = () => {
    SetVoice(true);
  };
  const StopHandle = () => {
    SetVoice(false);
  };
  const ClearHandle = () => {
    SetAudioMessage("");
    SetVoice(false);
  };
  return (
    <div className="Recorder">
      <ReactMic className="React-mic" record={Voice} onStop={OnStop}></ReactMic>
      {AudioMessage ? <button onClick={ClearHandle}>Очистить</button> : ""}
      {!Voice ? (
        <button onClick={StartHandle}>Старт</button>
      ) : (
        <button onClick={StopHandle}>Стоп</button>
      )}
      {AudioMessage ? <audio controls src={AudioMessage}></audio> : null}
    </div>
  );
}
