import { Router } from "express";
import UserSchema from "../Schema/UserSchema.js";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
import { UserLoginModel, UserRegisterModel } from "../model/UserModel.js";
export const authRouter = Router();
authRouter.get("/getMe/:token", async (req, res) => {
  console.log();
  try {
    const jwttoken = req.params.token;
    const decode = jwtDecode(jwttoken);
    const user = await UserSchema.findById(decode.user._id);
    console.log(user);
    if (!user) {
      return res.json({});
    }
    const token = jwt.sign(
      {
        _id: user._id,
        user: user._doc,
      },
      "secret123"
    );

    return res.json({
      user,
      token,
    });
  } catch (error) {
    return res.json({
      ErrorMessage: "Ошибка",
    });
  }
});

authRouter.post("/register", UserRegisterModel, async (req, res) => {
  try {
    const doc = new UserSchema({
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.lastName,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123"
    );

    return res.status(200).json({
      token,
      ...user,
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
});

authRouter.post("/login", UserLoginModel, async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        message: "Такой пользователь не найден",
      });
    }
    const findedPassword = user.password;

    if (findedPassword === req.body.password) {
      const token = jwt.sign(
        {
          _id: user._id,
          user: user._doc,
        },
        "secret123"
      );

      return res.json({
        message: "Вход успешен",
        user,
        token,
      });
    } else {
      return res.json({
        message: "Неверный логин или пароль",
      });
    }
  } catch (error) {
    return res.json({
      message: "Неверный логин или хер знает что",
    });
  }
});
