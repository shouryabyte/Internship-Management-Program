import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import InternshipCard from '@/components/dashboard/InternshipCard';
import { mockDashboardStats, mockInternships, mockApplications } from '@/data/mockData';
import { Users, Briefcase, FileText, Award, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  shortlisted: 'bg-primary/10 text-primary border-primary/20',
  interviewed: 'bg-accent/10 text-accent border-accent/20',
  selected: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          {greeting()}, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          {isAdmin
            ? "Here's an overview of internship placements and student activities."
            : "Track your applications and discover new internship opportunities."}
        </p>
      </div>

      {/* Stats Grid - Admin View */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value={mockDashboardStats.totalStudents}
            icon={Users}
            change={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Active Internships"
            value={mockDashboardStats.totalInternships}
            icon={Briefcase}
            change={{ value: 8, positive: true }}
          />
          <StatsCard
            title="Total Applications"
            value={mockDashboardStats.activeApplications}
            icon={FileText}
            change={{ value: 24, positive: true }}
          />
          <StatsCard
            title="Students Placed"
            value={mockDashboardStats.placedStudents}
            icon={Award}
            change={{ value: 15, positive: true }}
          />
        </div>
      )}

      {/* Student Stats */}
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="My Applications"
            value={3}
            icon={FileText}
          />
          <StatsCard
            title="Interviews Scheduled"
            value={1}
            icon={Clock}
          />
          <StatsCard
            title="Profile Views"
            value={24}
            icon={TrendingUp}
            change={{ value: 12, positive: true }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {isAdmin ? 'Latest Internships' : 'Recommended Internships'}
            </h2>
            <a href="/internships" className="text-sm font-medium text-primary hover:underline">
              View all →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockInternships.slice(0, 4).map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                showApplyButton={!isAdmin}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Applications */}
          <div className="bg-card rounded-xl border border-border/50 shadow-card p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                {isAdmin ? 'Recent Applications' : 'My Applications'}
              </h3>
              <a href="/applications" className="text-xs text-primary hover:underline">
                View all
              </a>
            </div>
            <div className="space-y-3">
              {mockApplications.slice(0, 4).map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {isAdmin ? application.studentName : application.internshipTitle}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {isAdmin ? application.internshipTitle : application.companyName}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("capitalize text-xs ml-2", statusStyles[application.status])}
                  >
                    {application.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-card rounded-xl border border-border/50 shadow-card p-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Upcoming Deadlines</h3>
            </div>
            <div className="space-y-3">
              {mockInternships.slice(0, 3).map((internship) => {
                const deadline = new Date(internship.deadline);
                const day = deadline.getDate();
                const month = deadline.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                
                return (
                  <div key={internship.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
                      <span className="text-xs font-medium">{month}</span>
                      <span className="text-lg font-bold leading-none">{day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {internship.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {internship.company.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats for Admin */}
          {isAdmin && (
            <div className="bg-card rounded-xl border border-border/50 shadow-card p-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-semibold text-foreground mb-4">Application Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pending Review</span>
                  <span className="text-sm font-semibold text-warning">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Shortlisted</span>
                  <span className="text-sm font-semibold text-primary">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interviewed</span>
                  <span className="text-sm font-semibold text-accent">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Selected</span>
                  <span className="text-sm font-semibold text-success">32</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
