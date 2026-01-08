import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

const SECRET = "demo-secret";

export const hashPassword = (password: string) =>
  bcrypt.hashSync(password, 8);

export const comparePassword = (p: string, h: string) =>
  bcrypt.compareSync(p, h);

export const generateToken = (user: User) =>
  jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );
