import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
export default function RightSide() {
  const State = useSelector((State) => State.user);
  const [UserInfoInput, SetUserInfoInput] = React.useState([
    { name: "ФИО" },
    { name: "Почта" },
    { name: "Телефон" },
    { name: "Адрес" },
  ]);
  return (
    <Box
      className="RightSide"
      sx={{
        width: 65 + "%",
        height: 80 + "%",
        marginTop: 15 + "px",
        background: "#ffffff",
      }}
    >
      <Box
        className="UserInfo"
        sx={{
          marginTop: 20 + "px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box className="Datas" sx={{ width: 30 + "%", marginLeft: 30 + "px" }}>
          {UserInfoInput.map((item) => {
            return (
              <Typography
                sx={{
                  padding: 11 + "px",
                  color: "black",
                  borderBottom: "1px solid black",
                  textAlign: "left",
                  margin: "10px 0px 20px 0px",
                }}
              >
                {item.name}
              </Typography>
            );
          })}
        </Box>
        <Box className="ParsedDatas" sx={{ width: 66 + "%" }}>
          <Typography
            component={"p"}
            sx={{
              marginTop: 0 + "px",
              marginBottom: 10 + "px",
              fontSize: 18 + "px",
              color: "#6c75a7",
              padding: "10px 10px 10px 0px",
              textAlign: "left",
              borderBottom: "1px solid #949494",
              margin: "11px 0px 18px 0px",
            }}
          >
            {State.UserInfo.fullName}
          </Typography>
          <Typography
            component={"p"}
            sx={{
              padding: "10px 10px 10px 0px",
              textAlign: "left",
              borderBottom: "1px solid #949494",
              margin: "10px 0px 20px 0px",
            }}
          >
            {State.UserInfo.email}
          </Typography>
        </Box>
      </Box>
      <Box
        className="Edit"
        sx={{
          width: 80 + "%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: 30 + "%",
          marginLeft: 35 + "px",
        }}
      >
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
      </Box>
    </Box>
  );
}
