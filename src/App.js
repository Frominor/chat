import "./App.css";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat";
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
    async function Async() {
      const { data } = await axios.get(
        `http://localhost:5000/auth/getMe/${localStorage.getItem("token")}`
      );
      if (data.ErrorMessage) {
        dispatch(ReloadPageReducer({ token: null, user: null }));
      }
      dispatch(ReloadPageReducer(data));
    }
    Async();
  }, []);
  return (
    <div className="App">
      <Main></Main>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<SignIn></SignIn>}></Route>
        <Route
          path="/profile/edit"
          element={<EditProfile></EditProfile>}
        ></Route>
        <Route path="/form" element={<Form></Form>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
    </div>
  );
}

export default App;
