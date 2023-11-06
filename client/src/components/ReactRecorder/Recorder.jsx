import React from "react";
import { ReactMic } from "react-mic";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import ClearIcon from "@mui/icons-material/Clear";
import "./recorder.css";
export default function Recorder({
  AudioMessage,
  SetAudioMessage,
  Voice,
  SetVoice,
}) {
  const OnStop = (blob) => {
    SetAudioMessage(blob.blobURL);
  };
  const StartHandle = () => {
    SetVoice(true);
  };
  const StopHandle = () => {
    SetVoice(false);
  };
  return (
    <div className="Recorder">
      <ReactMic className="React-mic" record={Voice} onStop={OnStop}></ReactMic>
      {!Voice ? (
        <KeyboardVoiceIcon
          sx={{
            marginTop: 28 + "px",
            marginLeft: 2 + "px",
            ":hover": { cursor: "pointer" },
          }}
          onClick={StartHandle}
        >
          Старт
        </KeyboardVoiceIcon>
      ) : (
        <ClearIcon
          onClick={StopHandle}
          sx={{
            marginTop: 28 + "px",
            padding: 2 + "px",
            color: "red",
            ":hover": { cursor: "pointer" },
          }}
        >
          Стоп
        </ClearIcon>
      )}
      {AudioMessage ? (
        <audio className="DemoAudio" controls src={AudioMessage}></audio>
      ) : null}
    </div>
  );
}
