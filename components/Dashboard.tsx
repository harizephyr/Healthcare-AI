'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Bell, 
  Settings, 
  User, 
  Activity, 
  Calendar, 
  FileText, 
  MessageSquare,
  BarChart3,
  Heart,
  Brain,
  Stethoscope,
  Pill,
  Clock,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Mic,
  Upload,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import PatientManagement from './PatientManagement';
import AIAssistant from './AIAssistant';
import HealthAnalytics from './HealthAnalytics';
import { patientData, appointmentData, healthMetrics, aiInsights } from '@/lib/mockData';

interface DashboardProps {
  onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    { icon: Plus, label: 'New Patient', action: () => setActiveTab('patients') },
    { icon: Calendar, label: 'Schedule', action: () => setActiveTab('appointments') },
    { icon: MessageSquare, label: 'AI Chat', action: () => setActiveTab('ai-assistant') },
    { icon: FileText, label: 'Records', action: () => setActiveTab('records') }
  ];

  const recentPatients = patientData.slice(0, 4);
  const upcomingAppointments = appointmentData.slice(0, 3);
  const todayMetrics = healthMetrics;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card m-4 p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="glass-button">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold gradient-text">HealthAI Dashboard</h1>
            <p className="text-sm text-white/60">
              {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input 
              placeholder="Search patients, records..."
              className="pl-10 glass-button border-0 w-64"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="glass-button relative">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center p-0">
                {notifications}
              </Badge>
            )}
          </Button>
          
          <Button variant="ghost" size="sm" className="glass-button">
            <Settings className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="glass-button">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="p-4 pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-card p-1 h-auto">
            <TabsTrigger value="overview" className="glass-button">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="patients" className="glass-button">
              <Users className="w-4 h-4 mr-2" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="glass-button">
              <Brain className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="analytics" className="glass-button">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="appointments" className="glass-button">
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {quickActions.map((action, index) => (
                <Card 
                  key={index}
                  className="glass-card p-6 cursor-pointer hover:scale-105 transition-all duration-300 group"
                  onClick={action.action}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">{action.label}</span>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Metrics Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Today's Patients</h3>
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {todayMetrics.totalPatients}
                </div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% from yesterday
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">AI Recommendations</h3>
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {todayMetrics.aiRecommendations}
                </div>
                <div className="flex items-center text-sm text-blue-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  98.5% accuracy rate
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Critical Alerts</h3>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {todayMetrics.criticalAlerts}
                </div>
                <div className="flex items-center text-sm text-orange-400">
                  <Clock className="w-4 h-4 mr-1" />
                  Avg response: 3min
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  Recent Patients
                </h3>
                <div className="space-y-3">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {patient.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-white">{patient.name}</div>
                          <div className="text-sm text-white/60">{patient.lastVisit}</div>
                        </div>
                      </div>
                      <Badge 
                        className={`${
                          patient.status === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          patient.status === 'Stable' ? 'bg-green-500/20 text-green-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-400" />
                  Upcoming Appointments
                </h3>
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div>
                        <div className="font-medium text-white">{appointment.patientName}</div>
                        <div className="text-sm text-white/60">{appointment.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">{appointment.time}</div>
                        <div className="text-xs text-white/60">{appointment.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <PatientManagement />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="analytics">
            <HealthAnalytics />
          </TabsContent>

          <TabsContent value="appointments">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Appointment Management</h3>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Appointment management system coming soon</p>
                <Button className="glass-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule New Appointment
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}