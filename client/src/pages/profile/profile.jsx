import React from "react";
import "./profile.css";
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
  const State = useSelector((state) => state.user);
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
      <div className="LeftSide">
        <ProfileAvatar></ProfileAvatar>
        <div className="Links">
          <ul>
            {Links.map((link) => {
              return (
                <li className="Link">
                  {link} {"-->dsadadadada"}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <RightSide></RightSide>
    </Box>
  );
}
