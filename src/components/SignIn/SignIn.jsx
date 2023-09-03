import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller, useFormState } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AsyncSignInThunk } from "../../Store/postslice";

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const State = useSelector((state) => state.user);
  const { handleSubmit, control } = useForm({ mode: "onSubmit" });
  const { errors } = useFormState({
    control,
  });

  const onSubmit = async (obj) => {
    dispatch(AsyncSignInThunk(obj));
  };
  if (State.token) {
    return <Navigate to={"/form"}></Navigate>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "Введите почту" }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      id="filled-hidden-label-small"
                      label={"Почта"}
                      error={!!errors.email?.message}
                      value={field.value}
                      helperText={errors.email?.message}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                ></Controller>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Введите пароль" }}
                  render={({ field }) => (
                    <TextField
                      label={"Пароль"}
                      fullWidth
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      error={!!errors.password?.message}
                      helperText={errors.password?.message}
                    ></TextField>
                  )}
                ></Controller>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
