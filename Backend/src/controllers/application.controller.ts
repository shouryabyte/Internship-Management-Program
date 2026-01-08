import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import { memoryStore } from "../storage/memory.store";
import { v4 as uuid } from "uuid";

export const applyInternship = (req: AuthRequest, res: Response) => {
  const app = {
    id: uuid(),
    internshipId: req.body.internshipId,
    studentId: req.user.id,
    status: "APPLIED" as const
  };

  memoryStore.applications.push(app);
  res.json(app);
};

export const myApplications = (req: AuthRequest, res: Response) => {
  res.json(
    memoryStore.applications.filter(a => a.studentId === req.user.id)
  );
};

export const updateStatus = (req: AuthRequest, res: Response) => {
  const app = memoryStore.applications.find(a => a.id === req.params.id);
  if (!app) return res.status(404).json({ message: "Not found" });

  app.status = req.body.status;
  res.json(app);
};
