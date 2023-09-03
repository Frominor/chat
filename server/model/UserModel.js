import { body } from "express-validator";
export const UserRegisterModel = [
  body("email").isEmail(),
  body("password").isString().isLength({ min: 3 }),
  body("fullName").isString(),
  body("avatarUrl").isString(),
];
export const UserLoginModel = [
  body("email").isEmail(),
  body("password").isString(),
];
