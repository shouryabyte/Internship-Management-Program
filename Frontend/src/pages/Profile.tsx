import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Calendar, Edit, Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <Card className="mb-6 overflow-hidden shadow-card animate-fade-in">
          <div className="h-32 gradient-hero relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
          </div>
          <CardContent className="relative pt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 sm:-mt-12">
              <div className="relative">
                <div className="w-28 h-28 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-white border-4 border-card shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center sm:text-left sm:pb-2 flex-1">
                <h1 className="text-2xl font-bold text-foreground">{user?.name}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div className="sm:pb-2">
                <Badge variant="outline" className="capitalize bg-primary/10 text-primary border-primary/20">
                  {user?.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input value={user?.name?.split(' ')[0] || ''} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input value={user?.name?.split(' ').slice(1).join(' ') || ''} readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ''} readOnly />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value="+1 (555) 123-4567" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input value="January 15, 1998" readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Your registered address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Street Address</Label>
                  <Input value="123 University Avenue" readOnly />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value="Cambridge" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input value="MA" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input value="02139" readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <CardHeader>
                <CardTitle className="text-base">Contact Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Email</p>
                    <p className="font-medium text-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Phone</p>
                    <p className="font-medium text-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Location</p>
                    <p className="font-medium text-foreground">Cambridge, MA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Member Since</p>
                    <p className="font-medium text-foreground">September 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-base">Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Auth
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
