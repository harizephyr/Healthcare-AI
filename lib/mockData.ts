import { Activity, TrendingUp, Users, Heart, Brain, Stethoscope, AlertTriangle, CheckCircle } from 'lucide-react';

export const patientData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    phone: '(555) 123-4567',
    email: 'sarah.j@email.com',
    condition: 'Type 2 Diabetes',
    status: 'Stable',
    lastVisit: '2024-01-15',
    vitals: {
      heartRate: '72 bpm',
      bloodPressure: '120/80',
      temperature: 98.6
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 45,
    gender: 'Male',
    phone: '(555) 234-5678',
    email: 'm.chen@email.com',
    condition: 'Hypertension',
    status: 'Monitoring',
    lastVisit: '2024-01-12',
    vitals: {
      heartRate: '78 bpm',
      bloodPressure: '140/90',
      temperature: 98.4
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 28,
    gender: 'Female',
    phone: '(555) 345-6789',
    email: 'emily.r@email.com',
    condition: 'Asthma',
    status: 'Stable',
    lastVisit: '2024-01-10',
    vitals: {
      heartRate: '68 bpm',
      bloodPressure: '115/75',
      temperature: 98.7
    }
  },
  {
    id: '4',
    name: 'Robert Wilson',
    age: 67,
    gender: 'Male',
    phone: '(555) 456-7890',
    email: 'r.wilson@email.com',
    condition: 'Heart Disease',
    status: 'Critical',
    lastVisit: '2024-01-14',
    vitals: {
      heartRate: '85 bpm',
      bloodPressure: '160/95',
      temperature: 99.1
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    age: 52,
    gender: 'Female',
    phone: '(555) 567-8901',
    email: 'lisa.t@email.com',
    condition: 'Arthritis',
    status: 'Stable',
    lastVisit: '2024-01-08',
    vitals: {
      heartRate: '74 bpm',
      bloodPressure: '125/82',
      temperature: 98.5
    }
  },
  {
    id: '6',
    name: 'David Kim',
    age: 39,
    gender: 'Male',
    phone: '(555) 678-9012',
    email: 'd.kim@email.com',
    condition: 'Migraine',
    status: 'Monitoring',
    lastVisit: '2024-01-11',
    vitals: {
      heartRate: '70 bpm',
      bloodPressure: '118/78',
      temperature: 98.6
    }
  }
];

export const appointmentData = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    type: 'Follow-up',
    date: 'Today',
    time: '2:30 PM',
    status: 'Confirmed'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    type: 'Consultation',
    date: 'Tomorrow',
    time: '10:00 AM',
    status: 'Pending'
  },
  {
    id: '3',
    patientName: 'Emily Rodriguez',
    type: 'Check-up',
    date: 'Jan 18',
    time: '3:45 PM',
    status: 'Confirmed'
  }
];

export const healthMetrics = {
  totalPatients: 342,
  aiRecommendations: 156,
  criticalAlerts: 8,
  responseTime: '3.2min'
};

export const aiInsights = [
  {
    title: 'Risk Predictions',
    description: 'High-risk patients identified',
    value: '23',
    icon: AlertTriangle,
    color: 'from-red-500 to-pink-500'
  },
  {
    title: 'Treatment Success',
    description: 'AI-recommended treatments',
    value: '94.2%',
    icon: CheckCircle,
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'Health Trends',
    description: 'Positive health outcomes',
    value: '+15.3%',
    icon: TrendingUp,
    color: 'from-blue-500 to-violet-500'
  }
];