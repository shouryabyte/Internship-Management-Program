import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-lg transition-all duration-300 animate-fade-in",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p
              className={cn(
                "mt-2 text-sm font-medium",
                change.positive ? "text-success" : "text-destructive"
              )}
            >
              {change.positive ? '+' : ''}{change.value}%{' '}
              <span className="text-muted-foreground font-normal">vs last month</span>
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-md">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
