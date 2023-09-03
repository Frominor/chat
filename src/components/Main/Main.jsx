import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReloadPageReducer, SignOutReducer } from "../../Store/postslice";
const pages = [
  { pageName: "Продукты", link: "/products" },
  { pageName: "Чат", link: "/form" },
];

function ResponsiveAppBar() {
  const State = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  console.log(State);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const SignOut = () => {
    dispatch(SignOutReducer(null));
    window.localStorage.removeItem("token");
    dispatch(ReloadPageReducer({ token: null, parseduser: null }));
  };
  const LinkTo = () => {
    if (!State.token) {
      alert("Войдите в аккаунт или зарегистрируйтесь");
    }
  };
  const sequenceSum = (begin, end, step) => {
    let sum = begin;
    if (begin == end) {
      return end;
    } else if (begin > end) {
      return 0;
    }
    while (sum <= end) {
      sum += step;
      if (sum > end) {
        return (sum -= step);
      }
    }
  };
  console.log(sequenceSum(2, 6, 2));
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.pageName} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              State.token ? (
                <Link style={{ textDecoration: "none" }} to={page.link}>
                  <Button
                    key={page.pageName}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.pageName}
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={LinkTo}
                  key={page.pageName}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.pageName}
                </Button>
              )
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {State.token ? (
              <>
                <Link to={"/register"}>
                  <Button
                    onClick={SignOut}
                    sx={{
                      color: "white",
                      marginRight: 5,
                      background: "red",
                      ":hover": {
                        background: "#E50000",
                      },
                    }}
                  >
                    Выйти
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/register"}>
                  <Button sx={{ color: "white", marginRight: 5 }}>
                    Регистрация
                  </Button>
                </Link>
                <Link to={"/login"}>
                  <Button sx={{ color: "white", marginRight: 5 }}>Войти</Button>
                </Link>
              </>
            )}

            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Link to={State.token ? "/profile" : "/register"}>
                  <Avatar
                    sx={State.UserInfo ? { width: 55, height: 55 } : {}}
                    src={
                      State.UserInfo?.avatarUrl
                        ? State.UserInfo.avatarUrl
                        : "/static/images/avatar/2.jpg"
                    }
                  />
                </Link>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
