import { body } from "express-validator";
export const MessageValidator = [body("text").isString()];
