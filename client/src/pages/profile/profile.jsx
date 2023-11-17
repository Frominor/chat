import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProfileAvatar from "../../components/avatar/avatar";
import RightSide from "./rightside/rightside";
import { Box } from "@mui/material";

export default function profile() {
  const [Links, SetLinks] = React.useState([
    "GitHub",
    "Twitter",
    "Вконтакте",
    "Telegram",
  ]);
  const State = useSelector((State) => State.user);
  if (!State.token) {
    return <Navigate to={"/register"}></Navigate>;
  }
  return (
    <Box
      className="Profile"
      sx={{
        display: "flex",
        width: 100 + "%",
        height: 90 + "vh",
        background: "#e2e8f0",
        justifyContent: "space-around",
      }}
    >
      <Box
        className="LeftSide"
        sx={{
          width: 25 + "%",
          margin: "16px 20px 0px 20px",
          display: "flex",
          height: 82.5 + "%",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <ProfileAvatar></ProfileAvatar>
        <Box
          className="Links"
          sx={{
            marginTop: 20 + "px",
            borderRadius: 5 + "px",
            background: "#ffffff",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {Links.map((link) => {
              return (
                <li className="Link" style={{ margin: 5 + "px" }}>
                  {link} {"-->dsadadadada"}
                </li>
              );
            })}
          </ul>
        </Box>
      </Box>
      <RightSide></RightSide>
    </Box>
  );
}
