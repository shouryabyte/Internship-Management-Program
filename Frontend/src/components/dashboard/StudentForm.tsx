import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Student } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  studentId: z.string().min(1, 'Student ID is required').max(50),
  department: z.string().min(1, 'Department is required').max(100),
  year: z.string().min(1, 'Year is required'),
  cgpa: z.coerce.number().min(0).max(10),
  phone: z.string().max(20).optional(),
  skills: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Student>) => void;
  initialData?: Student | null;
}

const departments = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Electrical',
  'Mechanical',
  'Civil',
  'Data Science',
  'AI & ML',
];

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const StudentForm: React.FC<StudentFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          skills: initialData.skills.join(', '),
        }
      : {
          name: '',
          email: '',
          studentId: '',
          department: '',
          year: '',
          cgpa: 0,
          phone: '',
          skills: '',
        },
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        skills: initialData.skills.join(', '),
      });
    } else {
      reset({
        name: '',
        email: '',
        studentId: '',
        department: '',
        year: '',
        cgpa: 0,
        phone: '',
        skills: '',
      });
    }
  }, [initialData, reset, open]);

  const onFormSubmit = (data: StudentFormData) => {
    const skillsArray = data.skills
      ? data.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    
    onSubmit({
      ...data,
      skills: skillsArray,
      id: initialData?.id || Date.now().toString(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {initialData ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter student name"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="student@college.edu"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                {...register('studentId')}
                placeholder="STU-2024-001"
                className={errors.studentId ? 'border-destructive' : ''}
              />
              {errors.studentId && (
                <p className="text-sm text-destructive">{errors.studentId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cgpa">CGPA</Label>
              <Input
                id="cgpa"
                type="number"
                step="0.1"
                min="0"
                max="10"
                {...register('cgpa')}
                placeholder="8.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                value={watch('department')}
                onValueChange={(value) => setValue('department', value)}
              >
                <SelectTrigger className={errors.department ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Year</Label>
              <Select
                value={watch('year')}
                onValueChange={(value) => setValue('year', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              {...register('skills')}
              placeholder="React, Python, SQL"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add Student'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentForm;
