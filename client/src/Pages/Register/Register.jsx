import Avatar from "@mui/material/Avatar";
import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, Controller, useFormState } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AsyncUserRegisterThunk } from "../../store/postslice";

export default function SignIn() {
  const dispatch = useDispatch();
  const State = useSelector((state) => state.user);
  const { register, handleSubmit, control } = useForm({ mode: "onSubmit" });
  const { errors } = useFormState({
    control,
  });
  if (State.token) {
    return <Navigate to={"/form"}></Navigate>;
  }

  const onSubmit = async (obj) => {
    const fullName = obj.firstName + " " + obj.lastName;
    delete obj.firstName;
    obj.lastName = fullName;
    console.log(obj);
    dispatch(AsyncUserRegisterThunk(obj));
  };

  return (
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
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ mb: 2, mt: 2 }}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "Введите имя" }}
                render={({ field }) => (
                  <TextField
                    name="firstName"
                    fullWidth
                    id="firstName"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    error={!!errors.firstName?.message}
                    helperText={errors.firstName?.message}
                    label="Имя"
                    autoFocus
                  />
                )}
              ></Controller>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 2, mt: 2 }}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Введите фамилию", minLength: 3 }}
                render={({ field }) => (
                  <TextField
                    name="lastName"
                    fullWidth
                    id="lastName"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    error={!!errors.lastName?.message}
                    helperText={errors.lastName?.message}
                    label="Фамилия"
                    autoFocus
                  />
                )}
              ></Controller>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Введите почту",
                  min: 5,
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    message: "Неверный формат",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    inputProps={{}}
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
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link to="/login">
                <Button variant="cover">Уже есть аккаунт? Войти</Button>
              </Link>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end"></Grid>
        </Box>
      </Box>
    </Container>
  );
}
