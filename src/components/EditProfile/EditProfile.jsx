import React from "react";
import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ChangeUserInfo } from "../../Store/postslice";
import {
  useForm,
  useFormState,
  Controller,
  useFieldArray,
} from "react-hook-form";
const theme = createTheme();
export default function EditProfile() {
  const State = useSelector((state) => state.user);
  console.log(State);
  const [NavigateTo, SetNavigateTo] = React.useState(false);
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      user: [
        { email: State.UserInfo.email, fullName: State.UserInfo.fullName },
      ],
    },
  });
  const { errors } = useFormState({
    control,
  });
  const { append, prepend, fields } = useFieldArray({
    name: "user",
    control,
  });
  const dispatch = useDispatch();
  const [Links, SetLinks] = React.useState([
    "GitHub",
    "Twitter",
    "Вконтакте",
    "Telegram",
  ]);

  const [Img, SetImg] = React.useState(null);
  if (!State.token) {
    return <Navigate to={"/register"}></Navigate>;
  }
  if (NavigateTo) {
    return <Navigate to={"/profile"}></Navigate>;
  }
  const onSubmit = async (obj) => {
    if (Img) {
      const formdata = new FormData();
      formdata.append("file", Img);
      obj.user = obj.user[0];
      obj.user.id = State.UserInfo._id;
      const { data } = await axios.post(
        `http://localhost:5000/file/${JSON.stringify(obj.user)}`,
        formdata
      );
      dispatch(ChangeUserInfo(data));
      SetNavigateTo(true);
    } else {
      obj.user[0].id = State.UserInfo._id;
      console.log(obj);
      const { data } = await axios.post(
        `http://localhost:5000/file/${JSON.stringify(...obj.user)}`
      );
      dispatch(ChangeUserInfo(data));
      SetNavigateTo(true);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <form className="Profile" onSubmit={handleSubmit(onSubmit)}>
        <div className="LeftSide">
          <div className="Avatar">
            <Avatar
              sx={
                State.UserInfo
                  ? {
                      width: 250,
                      height: 250,
                      marginBottom: 20 + "px",
                      marginTop: 20 + "px",
                    }
                  : {}
              }
              src={
                State.UserInfo?.avatarUrl
                  ? State.UserInfo.avatarUrl
                  : "/static/images/avatar/2.jpg"
              }
            />
            <p
              className="FullName"
              style={{ color: "#6c75a7", fontWeight: 800, fontSize: 15 + "px" }}
            >
              {State.UserInfo?.fullName}
            </p>
            <p>{"Frontend-developer"}</p>
            <p>{"Тут могла быть ваша реклама :)"}</p>
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
        <div className="EditProfileRightSide">
          <div className="EditProfileUserInfo">
            <div className="EditProfileDatas">
              <p>ФИО</p>
              <p>Почта</p>
              <p>Телефон</p>
              <p>Адрес</p>
              <p>Пол</p>
            </div>
            <div className="EditProfileParsedDatas">
              <Box>
                <Grid container spacing={2} />
                <Grid item xs={12}>
                  {fields.map((item, index) => {
                    const fieldName = `user[${index}].fullName`;
                    const email = `user[${index}].email`;
                    return (
                      <Box>
                        <Controller
                          name={fieldName}
                          control={control}
                          key={item.id}
                          render={({ field, fieldState }) => (
                            <TextField
                              sx={{ padding: 5 + "px", marginTop: 18 + "px" }}
                              label={"Введите новое ФИО"}
                              {...field}
                              fullWidth
                              id="standard-basic"
                              variant="standard"
                            ></TextField>
                          )}
                        ></Controller>
                        <Controller
                          control={control}
                          name={email}
                          key={item.id}
                          render={({ field, fieldState }) => (
                            <TextField
                              sx={{ padding: 5 + "px", marginTop: 7 + "px" }}
                              {...field}
                              id="standard-basic"
                              variant="standard"
                              label={"Введите новую почту"}
                              fullWidth
                            />
                          )}
                        ></Controller>
                      </Box>
                    );
                  })}
                </Grid>
              </Box>
            </div>
          </div>
          <div className="Edit">
            <Button
              type="submit"
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
              Сохранить
            </Button>
          </div>
        </div>
        <input
          className="ChangeAvatar"
          style={{ width: 250, height: 250, position: "absolute" }}
          type="file"
          onChange={(e) => {
            SetImg(e.target.files[0]);
          }}
        ></input>
      </form>
    </ThemeProvider>
  );
}
