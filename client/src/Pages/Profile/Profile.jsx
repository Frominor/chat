import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProfileAvatar from "../../components/Avatar/Avatar";
import RightSide from "./RightSide/RightSide";

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
        <ProfileAvatar></ProfileAvatar>
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
      <RightSide></RightSide>
    </div>
  );
}
