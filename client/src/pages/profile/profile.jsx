import React from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProfileAvatar from "../../components/avatar/avatar";
import RightSide from "./rightside/rightside";

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
    <div className="Profile">
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
    </div>
  );
}
