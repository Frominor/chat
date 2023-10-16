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
  colors,
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
        <label
          className="ChangeAvatar"
          for={"123"}
          style={{
            position: "absolute",
            cursor: "pointer",
            width: 220,
            height: 220,
            zIndex: 20,
            display: "flex",
            opacity: 1,
          }}
        >
          <div className="EditProfileSvgBox">
            <svg
              className="EditProfileSvg"
              width="100px"
              height="100px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z"
                stroke="#fff"
                stroke-width="0.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z"
                stroke="#fff"
                stroke-width="0.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </label>
        <input
          id="123"
          className="ChangeAvatar"
          style={{
            width: 250,
            height: 250,
            position: "absolute",
            display: "none",
          }}
          type="file"
          onChange={(e) => {
            SetImg(e.target.files[0]);
          }}
        ></input>
      </form>
    </ThemeProvider>
  );
}
