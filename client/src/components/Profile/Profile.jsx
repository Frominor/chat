import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Avatar, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

export default function Profile() {
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
    <div className="Profile">
      <div className="LeftSide">
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
          <p>{"Frontend-developer"}</p>
          <p>{"Россия,г.Орел"}</p>
        </div>
        <div className="Links">
          <ul>
            {Links.map((link) => {
              return (
                <li className="Link">
                  {link} {"dsadadadada"}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="RightSide">
        <div className="UserInfo">
          <div className="Datas">
            <p>ФИО</p>
            <p>Почта</p>
            <p>Телефон</p>
            <p>Адрес</p>
            <p>Пол</p>
          </div>
          <div className="ParsedDatas">
            <p>{State.UserInfo.fullName}</p>
            <p>{State.UserInfo.email}</p>
          </div>
        </div>
        <div className="Edit">
          <Link to={"/profile/edit"} style={{ textDecoration: "none" }}>
            <Button
              sx={{
                my: 2,
                ":hover": {
                  color: "white",
                  background: "#1976D2",
                },
                color: "white",
                display: "block",
                background: "#1976D2",
                padding: 1,
              }}
            >
              Редактировать
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
