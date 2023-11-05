import React from "react";
import "./Avatar.css";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
export default function ProfileAvatar() {
  const State = useSelector((state) => state.user);
  return (
    <div className="Avatar">
      <Avatar
        sx={
          State.UserInfo
            ? {
                width: 250,
                height: 250,
                marginTop: 20 + "px",
                marginBottom: 20 + "px",
              }
            : {}
        }
        src={
          State.UserInfo?.avatarUrl
            ? State.UserInfo.avatarUrl
            : "/static/images/avatar/2.jpg"
        }
      />
      <h5>{State.UserInfo.fullName}</h5>
      <p>{"Ваша профессия"}</p>
      <p>{"Ваша страна и город"}</p>
    </div>
  );
}
