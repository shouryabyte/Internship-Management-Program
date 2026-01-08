import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCompanies, mockInternships } from '@/data/mockData';
import { Plus, Search, Building2, MapPin, Globe, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Companies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInternshipCount = (companyId: string) => {
    return mockInternships.filter((i) => i.company.id === companyId).length;
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Companies</h1>
          <p className="mt-1 text-muted-foreground">
            Manage partner companies and organizations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border/50 shadow-card p-4 mb-6 animate-fade-in">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company name, industry, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filteredCompanies.length}</span> partner companies
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className="bg-card rounded-xl p-6 border border-border/50 shadow-card hover:shadow-lg transition-all duration-300 group animate-scale-in"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <Badge variant="outline" className="bg-secondary/50">
                {company.industry}
              </Badge>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {company.name}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{company.location}</span>
              </div>
              {company.website && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {company.website.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {getInternshipCount(company.id)} active internships
                </span>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No companies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search query
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Companies;
