import { User } from "../models/user.model";
import { Internship } from "../models/internship.model";
import { Application } from "../models/application.model";

export const memoryStore = {
  users: [] as User[],
  internships: [] as Internship[],
  applications: [] as Application[]
};
