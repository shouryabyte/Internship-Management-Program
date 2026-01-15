import express from "express";
import cors from "cors";

import { auth, isAdmin, isStudent } from "./auth/auth.middleware";

import * as authCtrl from "./controllers/auth.controller";
import * as internshipCtrl from "./controllers/internship.controller";
import * as appCtrl from "./controllers/application.controller";

const app = express();

/* -------------------- GLOBAL MIDDLEWARES -------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "https://internhub-personal.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

/* -------------------- HEALTH -------------------- */
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is reachable 🚀",
  });
});

/* -------------------- AUTH -------------------- */
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/login", authCtrl.login);

/* -------------------- INTERNSHIPS -------------------- */
app.post(
  "/api/internships",
  auth,
  isAdmin,
  internshipCtrl.createInternship
);

app.get(
  "/api/internships",
  auth,
  internshipCtrl.listInternships
);

/* -------------------- STUDENT -------------------- */
app.post(
  "/api/applications",
  auth,
  isStudent,
  appCtrl.applyInternship
);

app.get(
  "/api/applications/me",
  auth,
  isStudent,
  appCtrl.myApplications
);

/* -------------------- ADMIN -------------------- */
app.get(
  "/api/applications",
  auth,
  isAdmin,
  appCtrl.getAllApplications
);

app.patch(
  "/api/applications/:id",
  auth,
  isAdmin,
  appCtrl.updateStatus
);

export default app;
