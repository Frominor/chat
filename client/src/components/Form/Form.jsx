import axios from "axios";
import React from "react";
import "./Form.css";
import { useReducer } from "react";
import io, { Socket } from "socket.io-client";
import { Controller, useForm, useFormState } from "react-hook-form";
import Chat from "../Chat/Chat";
import reducer from "../../reducer";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
export default function Form() {
  const { register, handleSubmit, control } = useForm({ mode: "onSubmit" });
  const { errors } = useFormState({
    control,
  });

  const UserInfo = useSelector((state) => state.user?.UserInfo);
  const socket = io("http://localhost:5000");
  const token = useSelector((state) => state.user.token);
  const [State, dispatch] = useReducer(reducer, {
    isAuth: false,
    messages: [],
    users: [],
    userName: "",
    roomId: "",
  });
  React.useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    }
    SetuserName(UserInfo?.fullName);
  }, []);
  const onLogin = async (roomId, userName) => {
    dispatch({
      type: "IS_AUTH",
      payload: {
        roomId,
        userName,
        bool: true,
      },
    });
    socket.emit("ROOM:JOIN", {
      roomId,
      userName,
    });
    const { data } = await axios.get(`http://localhost:5000/rooms/${roomId}`);
    console.log(data);
    dispatch({
      type: "ROOM:JOINED",
      payload: data.users,
    });
    dispatch({
      type: "NEW_MESSAGE",
      payload: data.messages,
    });
  };
  React.useEffect(() => {
    socket.on("ROOM:JOINED", (messages) => {
      dispatch({
        type: "CONNECTION",
        payload: messages,
      });
    });
    socket.on("ROOM:LEAVE", (users) => {
      dispatch({
        type: "ROOM:JOINED",
        payload: users,
      });
    });
    socket.on("ROOM:NEW_MESSAGE", (obj) => {
      dispatch({
        type: "NEW_MESSAGE",
        payload: [obj],
      });
    });
    socket.on("ROOM:DELETE_MESSAGE", (data) => {
      dispatch({
        type: "DELETED_MESSAGE",
        payload: data,
      });
    });
  });
  const [roomId, SetroomId] = React.useState("");
  const [userName, SetuserName] = React.useState("");
  const onSubmit = async (obj) => {
    await axios
      .post("http://localhost:5000/rooms", {
        roomId,
        userName,
      })
      .then((res) => {
        onLogin(roomId, userName);
        console.log(res.messages);
        dispatch({
          type: "ROOM:JOINED",
          payload: res.data.messages,
        });
      });
  };
  return (
    <div className="Form">
      {State.isAuth ? (
        <Chat
          dispatch={dispatch}
          users={State.users}
          messages={State.messages}
          socket={socket}
          userName={State.userName}
          roomId={State.roomId}
        ></Chat>
      ) : (
        <form className="Form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="roominput"
              control={control}
              rules={{ required: "Ошибка! Адрес комнаты пустой", minLength: 1 }}
              render={({ field }) => (
                <TextField
                  name="roominput"
                  id="standard-basic"
                  variant="standard"
                  label="Название комнаты"
                  value={field.value}
                  onChange={(e) => {
                    SetroomId(e.target.value);
                    field.onChange(e.target.value);
                  }}
                  error={!!errors.roominput?.message}
                  helperText={errors.roominput?.message}
                ></TextField>
              )}
            ></Controller>
          </div>
          <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
            Войти
          </Button>
        </form>
      )}
    </div>
  );
}
