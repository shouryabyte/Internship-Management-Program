import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET = "demo-secret";

// example in-memory users (or DB)
const users: any[] = [];

export const register = (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "User exists" });
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    role, // "admin" or "student"
  };

  users.push(user);
  res.status(201).json({ message: "Registered" });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 🔑 CREATE JWT
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role, // must be lowercase: "admin" | "student"
    },
    SECRET,
    { expiresIn: "1h" }
  );

  // ✅ RETURN TOKEN + USER (IMPORTANT)
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};
