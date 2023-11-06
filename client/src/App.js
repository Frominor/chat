import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";
import Header from "./components/header/header";
import React from "react";
import Register from "./Pages/register/register";
import Form from "./Pages/form/form";
import SignIn from "./Pages/signin/signin.jsx";
import Profile from "./Pages/Profile/profile";
import { useDispatch, useSelector } from "react-redux";
import { ReloadPageReducer } from "./store/postslice";
import axios from "./axios/axios";
import EditProfile from "./Pages/editprofile/editprofile.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function AsyncGetUserInfo() {
      const { data } = await axios.get(
        `/auth/getMe/${localStorage.getItem("token")}`
      );

      if (data.ErrorMessage) {
        dispatch(ReloadPageReducer({ token: null, user: null }));
      }
      dispatch(ReloadPageReducer(data));
    }
    AsyncGetUserInfo();
  }, []);
  return (
    <div className="App">
      <Header></Header>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/register"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Register></Register>
              </Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <SignIn></SignIn>
              </Suspense>
            }
          ></Route>
          <Route
            path="/profile/edit"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <EditProfile></EditProfile>
              </Suspense>
            }
          ></Route>
          <Route
            path="/form"
            element={
              <Suspense fallback={<p>Loading</p>}>
                <Form></Form>
              </Suspense>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Spin></Spin>}>
                <Profile></Profile>
              </Suspense>
            }
          ></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
