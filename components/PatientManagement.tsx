'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Heart, 
  Activity,
  FileText,
  Edit,
  Eye,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { patientData } from '@/lib/mockData';

export default function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);

  const filteredPatients = patientData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Critical':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'Stable':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Stable':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text">Patient Management</h2>
          <p className="text-white/60">Manage and monitor your patients with AI-powered insights</p>
        </div>
        
        <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
          <DialogTrigger asChild>
            <Button className="glass-button pulse-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="gradient-text">Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-white">Full Name</Label>
                <Input className="glass-button border-0" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Date of Birth</Label>
                <Input type="date" className="glass-button border-0" />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Phone Number</Label>
                <Input className="glass-button border-0" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Email</Label>
                <Input type="email" className="glass-button border-0" placeholder="patient@email.com" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label className="text-white">Primary Condition</Label>
                <Input className="glass-button border-0" placeholder="Primary health condition" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label className="text-white">Medical History</Label>
                <Textarea className="glass-button border-0 min-h-[100px]" placeholder="Brief medical history..." />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsNewPatientOpen(false)} className="glass-button">
                Cancel
              </Button>
              <Button className="glass-button bg-gradient-to-r from-blue-500 to-teal-500">
                Add Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search patients by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-button border-0"
            />
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="glass-button border-0 w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/20">
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="glass-button">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Patient List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 hover:border-white/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                      <Badge className={`${getStatusColor(patient.status)} border`}>
                        {getStatusIcon(patient.status)}
                        <span className="ml-1">{patient.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Age {patient.age} • {patient.gender}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        {patient.condition}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <div className="text-sm text-white/60">Last Visit</div>
                    <div className="text-sm font-medium text-white">{patient.lastVisit}</div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="glass-button">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="glass-button">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="glass-button">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Patient Quick Stats */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold gradient-text">{patient.vitals.heartRate}</div>
                    <div className="text-xs text-white/60">Heart Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold gradient-text">{patient.vitals.bloodPressure}</div>
                    <div className="text-xs text-white/60">Blood Pressure</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold gradient-text">{patient.vitals.temperature}°F</div>
                    <div className="text-xs text-white/60">Temperature</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredPatients.length === 0 && (
        <Card className="glass-card p-12 text-center">
          <User className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No patients found</h3>
          <p className="text-white/60 mb-6">Try adjusting your search criteria or add a new patient</p>
          <Button onClick={() => setIsNewPatientOpen(true)} className="glass-button">
            <Plus className="w-4 h-4 mr-2" />
            Add New Patient
          </Button>
        </Card>
      )}
    </div>
  );
}