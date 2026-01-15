import express from "express";
import cors from "cors";

/* Middlewares */
import { auth, isAdmin, isStudent } from "./auth/auth.middleware";

/* Controllers */
import * as authCtrl from "./controllers/auth.controller";
import * as internshipCtrl from "./controllers/internship.controller";
import * as appCtrl from "./controllers/application.controller";

const app = express();

/* -------------------- GLOBAL MIDDLEWARES -------------------- */
app.use(
  cors({
    origin: "*", // OK for now (tighten later)
    credentials: true,
  })
);
app.use(express.json());

/* -------------------- HEALTH CHECK -------------------- */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is reachable 🚀",
  });
});

/* -------------------- AUTH ROUTES -------------------- */
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);

/* -------------------- INTERNSHIP ROUTES -------------------- */
app.post(
  "/internships",
  auth,
  isAdmin,
  internshipCtrl.createInternship
);

app.get(
  "/internships",
  auth,
  internshipCtrl.listInternships
);

/* -------------------- STUDENT ROUTES -------------------- */
app.post(
  "/applications",
  auth,
  isStudent,
  appCtrl.applyInternship
);

app.get(
  "/applications/me",
  auth,
  isStudent,
  appCtrl.myApplications
);

/* -------------------- ADMIN ROUTES -------------------- */
app.get(
  "/applications",
  auth,
  isAdmin,
  appCtrl.getAllApplications
);

app.patch(
  "/applications/:id",
  auth,
  isAdmin,
  appCtrl.updateStatus
);

export default app;
