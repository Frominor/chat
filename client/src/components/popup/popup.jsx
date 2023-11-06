import React from "react";
import "./popup.css";
export default function PopUp({ url, SetPopUpActive, SetScaledImgSrc }) {
  return (
    <div
      className="PopUp"
      onClick={() => {
        SetPopUpActive(false);
        SetScaledImgSrc(null);
      }}
    >
      <div className="PopUp_Main">
        <img className="ScaledImage" src={url}></img>
      </div>
    </div>
  );
}
