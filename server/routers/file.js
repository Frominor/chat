import { Router } from "express";
import path from "node:path";
import { fs } from "file-system";
import UserSchema from "../Schema/UserSchema.js";
import { fileURLToPath } from "node:url";
export const fileRouter = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fileRouter.post("/:user", async (req, res) => {
  try {
    const parseduser = JSON.parse(req.params.user);
    if (!req.files) {
      if (!parseduser) {
        return res.status(400).json({
          message: "Нет файла",
        });
      } else {
        await UserSchema.findByIdAndUpdate(parseduser.id, {
          fullName: parseduser.fullName,
          email: parseduser.email,
        });
        const user = await UserSchema.findById(parseduser.id);

        return res.json({
          ...user._doc,
        });
      }
    }

    const file = req.files.file;
    if (!file) {
      return res.json("Ошибка");
    }
    const newFile = encodeURI(Date.now() + "-" + file.name);
    const uploadPath = path.join(__dirname, "..", "images", newFile);
    console.log(uploadPath);
    await fs.promises.writeFile(uploadPath, file.data, "binary");
    file.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).json({
          message: "Ошибка",
        });
      }
      await UserSchema.findByIdAndUpdate(parseduser.id, {
        avatarUrl: `http://localhost:5000/images/${newFile}`,
        fullName: parseduser.fullName,
        email: parseduser.email,
      });
      const user = await UserSchema.findById(parseduser.id);
      res.json({
        ...user._doc,
      });
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
});
