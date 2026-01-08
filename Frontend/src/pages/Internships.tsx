import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InternshipCard from "@/components/dashboard/InternshipCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Internship } from "@/types";
import { Plus, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Internships: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";

  const [search, setSearch] = useState("");
  const [internships, setInternships] = useState<Internship[]>([]);

  const handlePostInternship = () => {
    const newInternship: Internship = {
      id: Date.now().toString(),
      title: "Frontend Intern",
      location: "Remote",
      duration: "3 months",
      stipend: 15000,
      type: "remote",
      deadline: new Date().toISOString(),
      company: {
        name: "Demo Company",
        logo: "",
      },
      skills: ["React", "TypeScript"],
    };

    setInternships(prev => [newInternship, ...prev]);

    toast({
      title: "Internship created",
      description: "New internship posted successfully",
    });
  };

  const filtered = internships.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Internships</h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Manage internship opportunities" : "Browse internships"}
          </p>
        </div>

        {isAdmin && (
          <Button onClick={handlePostInternship}>
            <Plus className="h-4 w-4 mr-2" />
            Post Internship
          </Button>
        )}
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search internships..."
          className="pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground mt-20">
          No internships found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(internship => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              showApplyButton={!isAdmin}
              onApply={() =>
                toast({
                  title: "Applied",
                  description: "Application submitted successfully",
                })
              }
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Internships;
