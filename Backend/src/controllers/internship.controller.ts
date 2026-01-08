import { Request, Response } from "express";
import { memoryStore } from "../storage/memory.store";
import { v4 as uuid } from "uuid";

export const createInternship = (req: Request, res: Response) => {
  const internship = {
    id: uuid(),
    title: req.body.title,
    company: req.body.company
  };

  memoryStore.internships.push(internship);
  res.json(internship);
};

export const listInternships = (req: Request, res: Response) => {
  res.json(memoryStore.internships);
};
