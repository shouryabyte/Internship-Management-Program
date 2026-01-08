import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ApplicationTable from '@/components/dashboard/ApplicationTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockApplications } from '@/data/mockData';
import { Application } from '@/types';
import { Search, Download, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Applications: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';

  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.internshipTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (applicationId: string, status: Application['status']) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId ? { ...app, status } : app
      )
    );
    toast({
      title: 'Status Updated',
      description: `Application has been marked as ${status}.`,
    });
  };

  const handleViewDetails = (application: Application) => {
    toast({
      title: application.internshipTitle,
      description: `Applicant: ${application.studentName} | Status: ${application.status}`,
    });
  };

  const statusCounts = {
    pending: applications.filter((a) => a.status === 'pending').length,
    shortlisted: applications.filter((a) => a.status === 'shortlisted').length,
    interviewed: applications.filter((a) => a.status === 'interviewed').length,
    selected: applications.filter((a) => a.status === 'selected').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Applications</h1>
          <p className="mt-1 text-muted-foreground">
            {isAdmin ? 'Review and manage student applications' : 'Track your application status'}
          </p>
        </div>
        {isAdmin && (
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        )}
      </div>

      {/* Status Overview - Admin Only */}
      {isAdmin && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                statusFilter === status
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border/50 bg-card hover:border-primary/50'
              }`}
            >
              <p className="text-2xl font-bold text-foreground">{count}</p>
              <p className="text-sm text-muted-foreground capitalize">{status}</p>
            </button>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border/50 shadow-card p-4 mb-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isAdmin ? "Search by student, internship, or company..." : "Search applications..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="interviewed">Interviewed</SelectItem>
              <SelectItem value="selected">Selected</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredApplications.length}</span> of{' '}
          <span className="font-medium text-foreground">{applications.length}</span> applications
        </p>
      </div>

      {/* Table */}
      <ApplicationTable
        applications={filteredApplications}
        onUpdateStatus={handleUpdateStatus}
        onViewDetails={handleViewDetails}
        isAdmin={isAdmin}
      />

      {filteredApplications.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No applications found</h3>
          <p className="text-muted-foreground">
            {isAdmin ? 'No applications match your filters' : 'Start applying to internships to see them here'}
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Applications;
