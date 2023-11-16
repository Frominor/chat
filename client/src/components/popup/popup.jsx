import React from "react";

import { Box, Container } from "@mui/material";
export default function PopUp({ url, SetPopUpActive, SetScaledImgSrc }) {
  return (
    <Container
      sx={{
        minWidth: 100 + "%",
        height: "100vh",
        position: "fixed",
        zIndex: 25,
        left: 0,
        bottom: 0,
        padding: 0,
        margin: 0,
        background: "grey",
        opacity: 0.9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="PopUp"
      onClick={() => {
        SetPopUpActive(false);
        SetScaledImgSrc(null);
      }}
    >
      <Box
        sx={{
          background: "white",
          padding: 15 + "px",
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
        }}
        className="PopUp_Main"
      >
        <img
          style={{
            minWidth: 30 + "vw",
            maxWidth: 500 + "px",
            maxHeight: 500 + "px",
          }}
          className="ScaledImage"
          src={url}
        ></img>
      </Box>
    </Container>
  );
}
