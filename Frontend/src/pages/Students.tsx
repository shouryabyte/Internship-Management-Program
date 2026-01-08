import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentTable from '@/components/dashboard/StudentTable';
import StudentForm from '@/components/dashboard/StudentForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockStudents } from '@/data/mockData';
import { Student } from '@/types';
import { Plus, Search, Download, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Students: React.FC = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter((s) => s.id !== studentId));
    toast({
      title: 'Student deleted',
      description: 'The student has been removed from the system.',
    });
  };

  const handleFormSubmit = (data: Partial<Student>) => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...s, ...data } as Student : s
        )
      );
      toast({
        title: 'Student updated',
        description: 'Student information has been updated successfully.',
      });
    } else {
      setStudents([...students, data as Student]);
      toast({
        title: 'Student added',
        description: 'New student has been added to the system.',
      });
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Students</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and view all enrolled students
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddStudent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border/50 shadow-card p-4 mb-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredStudents.length}</span> of{' '}
          <span className="font-medium text-foreground">{students.length}</span> students
        </p>
      </div>

      {/* Table */}
      <StudentTable
        students={filteredStudents}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />

      {/* Form Modal */}
      <StudentForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
      />
    </DashboardLayout>
  );
};

export default Students;
