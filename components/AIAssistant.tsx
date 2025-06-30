'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Brain, 
  User, 
  Sparkles, 
  FileText,
  Activity,
  Heart,
  Stethoscope,
  Upload,
  Camera,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { aiInsights } from '@/lib/mockData';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Health Assistant. I can help you with patient analysis, symptom assessment, treatment recommendations, and medical insights. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Analyze patient symptoms',
        'Review medical history',
        'Treatment recommendations',
        'Drug interactions check'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
        suggestions: getResponseSuggestions(inputMessage)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('symptom') || lowerInput.includes('pain') || lowerInput.includes('fever')) {
      return 'Based on the symptoms described, I recommend conducting a thorough examination. The combination of symptoms suggests possible inflammatory response. Consider ordering CBC, CRP, and vital signs monitoring. Would you like me to suggest a differential diagnosis protocol?';
    }
    
    if (lowerInput.includes('medication') || lowerInput.includes('drug') || lowerInput.includes('prescription')) {
      return 'I\'ve analyzed the medication profile. Please note potential interactions between the current prescriptions. The dosage appears appropriate for the patient\'s age and weight. I recommend monitoring liver function tests and checking for any adverse reactions. Shall I provide alternative medication options?';
    }
    
    if (lowerInput.includes('diagnosis') || lowerInput.includes('condition')) {
      return 'Based on the clinical presentation and available data, the most likely diagnosis is consistent with the patient\'s history. I recommend confirming with additional diagnostic tests including imaging studies and laboratory workup. The confidence level for this assessment is 94.2%.';
    }
    
    return 'I understand your query and I\'m analyzing the medical context. Based on current medical guidelines and best practices, I recommend a comprehensive approach. Would you like me to provide specific recommendations, suggest diagnostic protocols, or analyze patient data in more detail?';
  };

  const getResponseSuggestions = (input: string): string[] => {
    return [
      'Provide differential diagnosis',
      'Suggest treatment protocol',
      'Check drug interactions',
      'Recommend follow-up care'
    ];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const quickActions = [
    { icon: FileText, label: 'Analyze Records', prompt: 'Please analyze the latest patient medical records for any concerning patterns.' },
    { icon: Activity, label: 'Symptom Check', prompt: 'Help me assess these symptoms and provide differential diagnosis options.' },
    { icon: Heart, label: 'Vital Review', prompt: 'Review the patient\'s vital signs and provide clinical interpretation.' },
    { icon: Stethoscope, label: 'Treatment Plan', prompt: 'Create a comprehensive treatment plan based on current diagnosis.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text flex items-center">
            <Brain className="w-8 h-8 mr-3" />
            AI Health Assistant
          </h2>
          <p className="text-white/60">Advanced medical AI for clinical decision support</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Zap className="w-3 h-3 mr-1" />
            Online
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            GPT-4 Powered
          </Badge>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="grid md:grid-cols-3 gap-4">
        {aiInsights.map((insight, index) => (
          <Card key={index} className="glass-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${insight.color} flex items-center justify-center`}>
                <insight.icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-white text-sm">{insight.title}</h3>
            </div>
            <p className="text-xs text-white/70 mb-2">{insight.description}</p>
            <div className="text-lg font-bold gradient-text">{insight.value}</div>
          </Card>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="glass-card p-6 h-[600px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-teal-500' : 'glass-card'} p-4 rounded-2xl`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-white/20' : 'bg-gradient-to-r from-purple-500 to-violet-500'}`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm leading-relaxed">{message.content}</p>
                      <div className="text-xs text-white/60 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                      
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="glass-button text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="glass-card p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(action.prompt)}
              className="glass-button text-xs flex items-center gap-2"
            >
              <action.icon className="w-3 h-3" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="glass-button"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" className="glass-button">
              <Upload className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="glass-button">
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Ask about symptoms, treatments, or patient care..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="glass-button border-0"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isLoading}
              className="glass-button bg-gradient-to-r from-blue-500 to-teal-500"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}