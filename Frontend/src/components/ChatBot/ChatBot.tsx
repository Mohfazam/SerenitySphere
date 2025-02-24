import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Brain, Activity, Book, Heart, Dna, Calendar, PieChart, Settings, User, ChevronLeft, Home, Sparkles, HeartPulse, Phone, Mic, Paperclip as PaperClip, Smile, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { useNavigate } from 'react-router-dom';
import { chat } from './lib/gemini';
import { SettingsPanel, ChatSettings } from './SettingsPanel';

interface AuthUser {
  id: string;
  username: string;
  email?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface NavItem {
  icon: React.ElementType;
  title: string;
  path: string;
}

const DEFAULT_SETTINGS: ChatSettings = {
  responseSpeed: 'normal',
  saveHistory: true,
  showTypingIndicator: true,
  quickReplies: ['Tell me more', 'What should I do?', 'I need advice'],
  allowDataStorage: true,
  autoDeleteHistory: false,
};

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('Home');
  const [isRecording, setIsRecording] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<ChatSettings>(() => {
    const savedSettings = localStorage.getItem('chatSettings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('chatSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (settings.autoDeleteHistory) {
      const handleBeforeUnload = () => {
        localStorage.removeItem('chatHistory');
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [settings.autoDeleteHistory]);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (isAuthenticated) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signin');
  };

  const navigation: NavItem[] = [
    { icon: Home, title: 'Home', path: '/' },
    { icon: Sparkles, title: 'MoodSphere', path: '/tracker' },
    { icon: Brain, title: 'MindScape', path: '/journaling' },
    { icon: HeartPulse, title: 'PsychGene', path: '/DNA' },
    { icon: Phone, title: 'Contact', path: '/edu' }
  ];

  const features = [
    { icon: Activity, title: 'Mood Tracking', description: 'View your latest mood data', action: 'Let\'s check your mood history' },
    { icon: Brain, title: 'Mental Wellness', description: 'Analyze your mental health patterns', action: 'Explore your wellness journey' },
    { icon: Dna, title: 'DNA Analysis', description: 'Review your DNA test results', action: 'Let\'s discuss your DNA analysis' },
    { icon: Book, title: 'Journal Entries', description: 'Read your recent journal entries', action: 'Review your journal thoughts' },
    { icon: Heart, title: 'Emotional Health', description: 'Track emotional well-being', action: 'Check emotional progress' },
    { icon: Calendar, title: 'Daily Check-in', description: 'Complete your daily check-in', action: 'Start daily check-in' },
    { icon: PieChart, title: 'Progress Report', description: 'View your wellness progress', action: 'See your progress report' },
    { icon: FileText, title: 'Health Records', description: 'Access your health records', action: 'View health records' }
  ];

  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8
  };

  const sidebarVariants = {
    open: {
      width: 320,
      transition: springTransition
    },
    closed: {
      width: 80,
      transition: springTransition
    }
  };

  const toggleButtonVariants = {
    open: {
      left: "288px",
      rotate: 0,
      transition: springTransition
    },
    closed: {
      left: "80px",
      rotate: 180,
      transition: springTransition
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeatureClick = async (action: string) => {
    const userMessage = { role: 'user' as const, content: action, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await chat(action);
      const aiResponse = {
        role: 'assistant' as const,
        content: response,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chat(input);
      const aiResponse = {
        role: 'assistant' as const,
        content: response,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNavigation = (path: string, title: string) => {
    setActiveNav(title);
    navigate(path);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar Toggle Button */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 z-50 p-2 bg-gray-700 rounded-full transition-colors hover:bg-gray-600"
        variants={toggleButtonVariants}
        animate={isSidebarOpen ? "open" : "closed"}
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </motion.button>

      {/* Side Navigation */}
      <motion.div 
        variants={sidebarVariants}
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        className="bg-gray-800 h-full relative"
      >
        <div className={`h-full flex flex-col ${isSidebarOpen ? 'px-4' : 'px-2'}`}>
          {/* User Profile / Sign In Button */}
          {isLoading ? (
            <div className={`flex items-center ${isSidebarOpen ? 'space-x-3 p-4' : 'justify-center p-2'} bg-gray-700/50 rounded-xl my-4 backdrop-blur-sm`}>
              <div className="w-12 h-12 rounded-full bg-gray-600 animate-pulse" />
              {isSidebarOpen && (
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-600 rounded animate-pulse" />
                  <div className="h-3 bg-gray-600 rounded animate-pulse w-2/3" />
                </div>
              )}
            </div>
          ) : user ? (
            <motion.div 
              className={`flex items-center ${isSidebarOpen ? 'space-x-3 p-4' : 'justify-center p-2'} bg-gray-700/50 rounded-xl my-4 backdrop-blur-sm`}
              layout
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/profile')}
              >
                <User className="w-6 h-6 text-white" />
              </motion.div>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">{user.username}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <p className="text-gray-300 text-sm">Online</p>
                        </div>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <LogIn className="w-5 h-5 transform rotate-180" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.button
              onClick={handleSignIn}
              className={`flex items-center ${isSidebarOpen ? 'space-x-3 px-4' : 'justify-center'} py-4 my-4 bg-purple-500 hover:bg-purple-600 rounded-xl transition-colors duration-200`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogIn className="w-5 h-5 text-white" />
              {isSidebarOpen && (
                <span className="text-white font-medium">Sign In</span>
              )}
            </motion.button>
          )}

          {/* Navigation Menu */}
          <nav className="mb-6 flex-1">
            {navigation.map((item) => (
              <motion.button
                key={item.title}
                onClick={() => handleNavigation(item.path, item.title)}
                className={`w-full flex items-center ${isSidebarOpen ? 'space-x-3 px-4' : 'justify-center'} py-3 rounded-lg transition-colors ${
                  activeNav === item.title
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:bg-gray-700/50'
                }`}
                title={!isSidebarOpen ? item.title : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && (
                  <span className="font-medium">{item.title}</span>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Settings Button */}
          <motion.button 
            onClick={() => setIsSettingsOpen(true)}
            className={`mt-auto flex items-center ${isSidebarOpen ? 'space-x-2 px-4' : 'justify-center'} py-3 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 mb-4`}
            title={!isSidebarOpen ? "Settings" : undefined}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 text-gray-400" />
            {isSidebarOpen && (
              <span className="text-gray-300">Settings</span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl cursor-pointer border border-gray-700/50 hover:border-purple-500/50 transition-all duration-200"
                  onClick={() => handleFeatureClick(feature.action)}
                >
                  <feature.icon className="w-8 h-8 text-purple-500 mb-3" />
                  <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage
                  message={message}
                  quickReplies={
                    message.role === 'assistant'
                      ? settings.quickReplies
                      : undefined
                  }
                  onQuickReplyClick={(reply) => {
                    setInput(reply);
                    handleSend();
                  }}
                />
              </motion.div>
            ))}
            {isTyping && settings.showTypingIndicator && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Chat Input */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-t border-gray-700/50 p-4 backdrop-blur-sm bg-gray-800/30"
        >
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-gray-300"
            >
              <PaperClip className="w-5 h-5" />
            </motion.button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700/50 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none placeholder-gray-400"
              rows={1}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleRecording}
              className={`p-2 rounded-full ${isRecording ? 'text-red-500' : 'text-gray-400 hover:text-gray-300'}`}
            >
              <Mic className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-gray-300"
            >
              <Smile className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};