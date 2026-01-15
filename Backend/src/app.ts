import express from "express";
import cors from "cors";

import { auth, isAdmin, isStudent } from "./auth/auth.middleware";
import * as authCtrl from "./controllers/auth.controller";
import * as internshipCtrl from "./controllers/internship.controller";
import * as appCtrl from "./controllers/application.controller";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    credentials: true,
  })
);
app.use(express.json());

/* ✅ HEALTH */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is reachable 🚀",
  });
});

/* ✅ AUTH */
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);

/* ✅ INTERNSHIPS */
app.post("/internships", auth, isAdmin, internshipCtrl.createInternship);
app.get("/internships", auth, internshipCtrl.listInternships);

/* ✅ APPLICATIONS */
app.post("/applications", auth, isStudent, appCtrl.applyInternship);
app.get("/applications/me", auth, isStudent, appCtrl.myApplications);

/* ✅ ADMIN */
app.get("/applications", auth, isAdmin, appCtrl.getAllApplications);
app.patch("/applications/:id", auth, isAdmin, appCtrl.updateStatus);

export default app;
