import React from "react";

import { useSelector } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import Container from "@mui/material/Container";
export default function ProfileAvatar() {
  const State = useSelector((State) => State.user);
  return (
    <Container
      className="Avatar"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Avatar
        sx={
          State.UserInfo
            ? {
                width: 300 + "px",
                height: 300 + "px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20 + "px",
                marginBottom: 20 + "px",
                "@media(max-height: 845px)": {
                  height: 150,
                  width: 150,
                },
                "@media(max-width: 620px)": {
                  height: 50,
                  width: 70,
                },
              }
            : {}
        }
        src={
          State.UserInfo?.avatarUrl
            ? State.UserInfo.avatarUrl
            : "/static/images/avatar/2.jpg"
        }
      />
      <Typography variant="h6" sx={{}}>
        {State.UserInfo.fullName}
      </Typography>
      <Typography
        variant="p"
        sx={{ color: "blue", fontSize: 20, fontFamily: "monospace" }}
      >
        {"Ваша профессия"}
      </Typography>
      <Typography
        variant="p"
        sx={{ color: "blue", fontSize: 20, fontFamily: "monospace" }}
      >
        {"Ваша страна и город"}
      </Typography>
    </Container>
  );
}
