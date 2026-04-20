import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Zap, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  Upload,
  Brain,
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      number: "01",
      title: "Paste Your Error",
      description: "Copy and paste your error message into our intuitive interface. Support for 13+ programming languages with automatic language detection.",
      icon: <Upload className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our advanced AI analyzes your error in real-time, identifying root causes and patterns from millions of similar cases.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "03",
      title: "Get Solutions",
      description: "Receive detailed explanations with step-by-step solutions, code examples, and preventive measures to avoid similar errors.",
      icon: <CheckCircle2 className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Get explanations in seconds, not hours. No more waiting for Stack Overflow responses."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your code is encrypted and never stored. We prioritize your privacy and data security."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Clear Explanations",
      description: "Get beginner-friendly explanations that help you understand what went wrong and how to fix it."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Always Learning",
      description: "Our AI continuously improves from user feedback, providing better explanations over time."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DebugSense AI</span> Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              From error to solution in three simple steps. Our AI-powered platform makes debugging 
              faster, easier, and more educational than ever before.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No Setup Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Works Instantly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Privacy First</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Three Simple Steps to Debug Freedom
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get from confused to confident in minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all h-full">
                  <div className="text-4xl font-bold text-gray-400 mb-4">
                    {step.number}
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose DebugSense AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just an error explainer - it's your debugging partner
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 mx-auto">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <Sparkles className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Try It Out?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Experience the power of AI-powered debugging right now
              </p>
              
              <motion.a
                href="/app"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                <Code2 className="w-5 h-5" />
                Start Debugging Now
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
