export type Status = "APPLIED" | "APPROVED" | "REJECTED";

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  status: Status;
}
