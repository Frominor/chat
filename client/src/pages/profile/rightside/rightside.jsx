import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./rightside.css";
import { useSelector } from "react-redux";
export default function RightSide() {
  const State = useSelector((state) => state.user);
  return (
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
  );
}
