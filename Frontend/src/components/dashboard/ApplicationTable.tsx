import React from 'react';
import { Application } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ApplicationTableProps {
  applications: Application[];
  onUpdateStatus?: (applicationId: string, status: Application['status']) => void;
  onViewDetails?: (application: Application) => void;
  isAdmin?: boolean;
}

const statusStyles: Record<Application['status'], string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  shortlisted: 'bg-primary/10 text-primary border-primary/20',
  interviewed: 'bg-accent/10 text-accent border-accent/20',
  selected: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
};

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onUpdateStatus,
  onViewDetails,
  isAdmin = false,
}) => {
  return (
    <div className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden animate-slide-up">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {isAdmin && <TableHead className="font-semibold">Student</TableHead>}
              <TableHead className="font-semibold">Internship</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Applied Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow
                key={application.id}
                className="hover:bg-muted/30 transition-colors"
              >
                {isAdmin && (
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                          {application.studentName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">{application.studentName}</span>
                    </div>
                  </TableCell>
                )}
                <TableCell className="font-medium text-foreground">
                  {application.internshipTitle}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {application.companyName}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(application.appliedDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("capitalize font-medium", statusStyles[application.status])}
                  >
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onViewDetails?.(application)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onUpdateStatus?.(application.id, 'shortlisted')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            Mark Shortlisted
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onUpdateStatus?.(application.id, 'interviewed')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-accent" />
                            Mark Interviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onUpdateStatus?.(application.id, 'selected')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2 text-success" />
                            Mark Selected
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onUpdateStatus?.(application.id, 'rejected')}
                            className="text-destructive focus:text-destructive"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Mark Rejected
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicationTable;
