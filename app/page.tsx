'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  Activity, 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  BarChart3,
  ChevronRight,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Dashboard from '@/components/Dashboard';

const features = [
  {
    icon: Brain,
    title: 'AI Health Assistant',
    description: 'Advanced AI-powered health analysis and personalized recommendations',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Patient Management',
    description: 'Comprehensive patient profiles with smart organization',
    color: 'from-teal-500 to-green-500'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'AI-optimized appointment scheduling and management',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: Activity,
    title: 'Health Monitoring',
    description: 'Real-time health tracking with predictive analytics',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: FileText,
    title: 'Medical Records',
    description: 'Secure digital health records with instant access',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Comprehensive health insights and trend analysis',
    color: 'from-pink-500 to-rose-500'
  }
];

const stats = [
  { label: 'Patients Managed', value: '10,000+' },
  { label: 'AI Predictions', value: '99.2%' },
  { label: 'Time Saved', value: '4.5hrs' },
  { label: 'Satisfaction', value: '98%' }
];

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-teal-600/20 to-violet-600/20 blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 px-4 py-2 bg-white/10 border-white/20 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Healthcare Management
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">HealthAI</span>
              <br />
              Management
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary healthcare management platform powered by advanced AI. 
              Streamline patient care, predict health outcomes, and transform your practice 
              with intelligent automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="glass-button px-8 py-4 text-lg pulse-glow"
                onClick={() => setShowDashboard(true)}
              >
                <Heart className="w-5 h-5 mr-2" />
                Launch Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-button px-8 py-4 text-lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                AI Demo
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card p-6 text-center floating-animation">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Intelligent Healthcare Solutions
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Harness the power of AI to revolutionize patient care, optimize workflows, 
              and deliver unprecedented healthcare outcomes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card p-8 h-full group hover:border-white/30 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  <ChevronRight className="w-5 h-5 text-white/40 mt-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-card p-12">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-6 gradient-text">
                HIPAA Compliant & Secure
              </h3>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Your patient data is protected with enterprise-grade security, 
                end-to-end encryption, and full HIPAA compliance. Trust the platform 
                that healthcare professionals rely on.
              </p>
              <div className="flex justify-center gap-8 text-sm text-white/60">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Real-time Processing
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  End-to-End Encryption
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}