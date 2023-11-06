import React from "react";
import close from "./close.png";
export default function PreloaderMessages({ ImageUrl, SetImgUrl }) {
  return (
    <div className="MessageForSend">
      {ImageUrl.map((item) => {
        return (
          <div className="SendingMessage" style={{ position: "relative" }}>
            <img
              style={{
                width: 150 + "px",
                height: 100 + "px",
              }}
              src={item.src}
              alt="Изображение не загружено"
            ></img>
            <img
              onClick={() => {
                SetImgUrl(
                  ImageUrl.filter((img) => {
                    if (item.src !== img.src) {
                      return img;
                    }
                  })
                );
              }}
              className="delImg"
              src={close}
              style={{
                width: 20 + "px",
                height: 20 + "px",
              }}
            ></img>
          </div>
        );
      })}
    </div>
  );
}
