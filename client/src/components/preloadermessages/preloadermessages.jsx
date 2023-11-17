import React from "react";
import close from "./close.png";
import { Box } from "@mui/material";
export default function PreloaderMessages({ ImageUrl, SetImgUrl }) {
  return (
    <Box
      className="MessageForSend"
      sx={{
        marginLeft: 25.5 + "%",
        width: 60 + "%",
        marginTop: 5 + "px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {ImageUrl.map((item) => {
        return (
          <Box
            id="SendingMessage"
            sx={{
              position: "relative",
              width: 120 + "px",
              height: 90 + "px",
              hover: {
                transition: "5ms ease-in-out",
                transform: "scale(1.4)",
              },
              display: "flex",
              marginLeft: 50 + "px",
              justifyContent: "space-evenly",
            }}
          >
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
              id="delImg"
              src={close}
              style={{
                width: 20 + "px",
                position: "absolute",
                height: 20 + "px",
                right: -15,
                top: 0,
                cursor: "pointer",
                zIndex: 20,
                opacity: 0.8,
                background: "white",
                transition: "opacity 0.22s",
              }}
            ></img>
          </Box>
        );
      })}
    </Box>
  );
}
