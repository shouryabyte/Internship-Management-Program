export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  year: string;
  cgpa: number;
  phone?: string;
  skills: string[];
  resumeUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  website?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: Company;
  description: string;
  location: string;
  type: 'remote' | 'onsite' | 'hybrid';
  duration: string;
  stipend: number;
  skills: string[];
  deadline: string;
  openings: number;
  status: 'open' | 'closed' | 'filled';
  postedDate: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected';
  coverLetter?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalInternships: number;
  activeApplications: number;
  placedStudents: number;
}
