import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";
import Main from "./components/Main/Main";
import React from "react";
import Register from "./components/Register/Register";
import Form from "./components/Form/Form";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { ReloadPageReducer } from "./Store/postslice";
import axios from "axios";
import EditProfile from "./components/EditProfile/EditProfile";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function AsyncGetUserInfo() {
      const { data } = await axios.get(
        `http://localhost:5000/auth/getMe/${localStorage.getItem("token")}`
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
      <Main></Main>
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
    </div>
  );
}

export default App;
