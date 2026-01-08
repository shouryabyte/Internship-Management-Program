import React from 'react';
import { Internship } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, IndianRupee, Users, Calendar, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InternshipCardProps {
  internship: Internship;
  onApply?: (internship: Internship) => void;
  showApplyButton?: boolean;
}

const typeStyles = {
  remote: 'bg-success/10 text-success border-success/20',
  onsite: 'bg-primary/10 text-primary border-primary/20',
  hybrid: 'bg-accent/10 text-accent border-accent/20',
};

const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  onApply,
  showApplyButton = true,
}) => {
  const daysUntilDeadline = Math.ceil(
    (new Date(internship.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-card rounded-xl p-5 border border-border/50 shadow-card hover:shadow-lg transition-all duration-300 group animate-scale-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {internship.title}
            </h3>
            <p className="text-sm text-muted-foreground">{internship.company.name}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn("capitalize", typeStyles[internship.type])}>
          {internship.type}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {internship.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{internship.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <IndianRupee className="h-4 w-4" />
          <span>₹{internship.stipend.toLocaleString()}/month</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{internship.openings} openings</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {internship.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {internship.skills.length > 3 && (
          <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded-full">
            +{internship.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-1.5 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className={cn(
            daysUntilDeadline <= 7 ? "text-destructive font-medium" : "text-muted-foreground"
          )}>
            {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
          </span>
        </div>
        {showApplyButton && internship.status === 'open' && daysUntilDeadline > 0 && (
          <Button size="sm" onClick={() => onApply?.(internship)}>
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;
