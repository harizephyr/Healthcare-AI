'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity, 
  Users, 
  Heart, 
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const patientTrendData = [
  { month: 'Jan', patients: 245, recovered: 198, critical: 12 },
  { month: 'Feb', patients: 267, recovered: 215, critical: 8 },
  { month: 'Mar', patients: 289, recovered: 234, critical: 15 },
  { month: 'Apr', patients: 312, recovered: 265, critical: 11 },
  { month: 'May', patients: 298, recovered: 251, critical: 9 },
  { month: 'Jun', patients: 334, recovered: 289, critical: 7 }
];

const conditionData = [
  { name: 'Cardiovascular', value: 35, color: '#3B82F6' },
  { name: 'Respiratory', value: 28, color: '#10B981' },
  { name: 'Neurological', value: 18, color: '#8B5CF6' },
  { name: 'Endocrine', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 7, color: '#EF4444' }
];

const aiPredictions = [
  { condition: 'Hypertension Risk', patients: 23, accuracy: 94.2, trend: 'up' },
  { condition: 'Diabetes Onset', patients: 15, accuracy: 91.8, trend: 'down' },
  { condition: 'Cardiac Events', patients: 8, accuracy: 97.1, trend: 'stable' },
  { condition: 'Medication Adherence', patients: 45, accuracy: 89.5, trend: 'up' }
];

const healthMetrics = [
  { title: 'Total Patients', value: '2,847', change: '+12.5%', trend: 'up', icon: Users },
  { title: 'Critical Cases', value: '23', change: '-8.2%', trend: 'down', icon: AlertTriangle },
  { title: 'Recovery Rate', value: '94.8%', change: '+2.1%', trend: 'up', icon: CheckCircle },
  { title: 'Avg Response Time', value: '3.2min', change: '-15.3%', trend: 'down', icon: Clock }
];

export default function HealthAnalytics() {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('patients');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text flex items-center">
            <BarChart3 className="w-8 h-8 mr-3" />
            Health Analytics
          </h2>
          <p className="text-white/60">AI-powered insights and predictive healthcare analytics</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="glass-button border-0 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/20">
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="glass-button">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          
          <Button className="glass-button bg-gradient-to-r from-blue-500 to-teal-500">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${
                  metric.trend === 'up' ? 'from-green-500 to-teal-500' : 
                  metric.trend === 'down' ? 'from-red-500 to-pink-500' : 
                  'from-blue-500 to-violet-500'
                } flex items-center justify-center`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">{metric.value}</div>
              <div className="text-sm text-white/60 mb-2">{metric.title}</div>
              <div className={`text-sm flex items-center ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change} from last month
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="glass-card p-1">
          <TabsTrigger value="overview" className="glass-button">Overview</TabsTrigger>
          <TabsTrigger value="patients" className="glass-button">Patient Trends</TabsTrigger>
          <TabsTrigger value="predictions" className="glass-button">AI Predictions</TabsTrigger>
          <TabsTrigger value="conditions" className="glass-button">Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Patient Trends Chart */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Patient Volume Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={patientTrendData}>
                  <defs>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="patients" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorPatients)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Condition Distribution */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                Condition Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={conditionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {conditionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px'
                    }} 
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Patient Analytics Dashboard</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={patientTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="patients" stroke="#3B82F6" strokeWidth={3} name="Total Patients" />
                <Line type="monotone" dataKey="recovered" stroke="#10B981" strokeWidth={3} name="Recovered" />
                <Line type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={3} name="Critical" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-violet-400" />
              AI Predictive Analytics
            </h3>
            <div className="space-y-4">
              {aiPredictions.map((prediction, index) => (
                <div key={index} className="glass-card p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{prediction.condition}</h4>
                    <Badge className={`${
                      prediction.trend === 'up' ? 'bg-red-500/20 text-red-400' :
                      prediction.trend === 'down' ? 'bg-green-500/20 text-green-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {prediction.trend === 'up' ? '↗' : prediction.trend === 'down' ? '↘' : '→'} 
                      {prediction.trend}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-white/60">At-Risk Patients</div>
                      <div className="text-lg font-bold gradient-text">{prediction.patients}</div>
                    </div>
                    <div>
                      <div className="text-white/60">Accuracy</div>
                      <div className="text-lg font-bold gradient-text">{prediction.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-white/60">Confidence</div>
                      <Progress value={prediction.accuracy} className="mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="conditions" className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Medical Condition Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={conditionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }} 
                />
                <Bar dataKey="value">
                  {conditionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}