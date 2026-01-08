export type Role = "ADMIN" | "STUDENT";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
