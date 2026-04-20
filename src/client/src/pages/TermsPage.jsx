import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Users, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const TermsPage = () => {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement",
          text: "By accessing and using DebugSense AI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to amend these terms at any time without prior notice. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of any modifications."
        },
        {
          subtitle: "Age Requirement",
          text: "You must be at least 13 years old to use this service. By using this service, you represent and warrant that you meet this age requirement."
        }
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Accounts",
      content: [
        {
          subtitle: "Account Creation",
          text: "You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          subtitle: "Account Responsibilities",
          text: "You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
        },
        {
          subtitle: "Account Termination",
          text: "We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion."
        }
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Service Terms",
      content: [
        {
          subtitle: "Service Description",
          text: "DebugSense AI provides AI-powered error analysis and debugging assistance. We strive to provide accurate and helpful explanations, but cannot guarantee perfect accuracy."
        },
        {
          subtitle: "Usage Limits",
          text: "Free accounts are limited to 10 error analyses per month. Paid plans have different limits as specified in our pricing page. We reserve the right to modify these limits."
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high availability but do not guarantee uninterrupted service. We may experience downtime for maintenance, updates, or technical issues."
        }
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "User Conduct",
      content: [
        {
          subtitle: "Prohibited Uses",
          text: "You may not use our service for illegal activities, harassment, spam, or to transmit malicious code. You may not attempt to reverse engineer our service or exceed usage limits."
        },
        {
          subtitle: "Content Responsibility",
          text: "You are solely responsible for any code or error messages you submit to our service. We do not claim ownership of your submitted content."
        },
        {
          subtitle: "Compliance",
          text: "You must comply with all applicable laws and regulations when using our service, including data protection and privacy laws."
        }
      ]
    }
  ];

  const limitations = [
    {
      title: "Service Disclaimer",
      description: "DebugSense AI is provided 'as is' without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any error analysis or explanation.",
      type: 'disclaimer'
    },
    {
      title: "Liability Limitation",
      description: "In no event shall DebugSense AI be liable for any indirect, incidental, special, or consequential damages arising from your use of our service.",
      type: 'limitation'
    },
    {
      title: "Indemnification",
      description: "You agree to indemnify and hold DebugSense AI harmless from any claims, damages, or expenses arising from your violation of these terms or use of our service.",
      type: 'indemnity'
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Terms of <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              These terms govern your use of DebugSense AI. By using our service, 
              you agree to these terms and conditions.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <span className="text-sm">Last updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to DebugSense AI. These Terms of Service ("Terms") govern your use of our 
              AI-powered error analysis service and related products and services (collectively, the "Service").
            </p>
            <p className="text-gray-600 leading-relaxed">
              Please read these Terms carefully before using our Service. By accessing or using our Service, 
              you agree to be bound by these Terms. If you disagree with any part of these terms, then you 
              may not access the Service.
            </p>
          </motion.div>

          {sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                  {section.icon}
                </div>
                {section.title}
              </h3>
              
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.subtitle}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Limitations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Limitations and Disclaimers</h3>
            
            <div className="space-y-6">
              {limitations.map((limitation, index) => (
                <div key={index} className="border-l-4 border-orange-500 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                    {limitation.type === 'disclaimer' && <AlertCircle className="w-5 h-5 text-orange-500" />}
                    {limitation.type === 'limitation' && <XCircle className="w-5 h-5 text-red-500" />}
                    {limitation.type === 'indemnity' && <Shield className="w-5 h-5 text-blue-500" />}
                    <h4 className="text-lg font-semibold text-gray-900">{limitation.title}</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{limitation.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Rights</h4>
                <p className="text-gray-600 leading-relaxed">
                  DebugSense AI and its original content, features, and functionality are owned by DebugSense AI 
                  and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Your Content</h4>
                <p className="text-gray-600 leading-relaxed">
                  You retain ownership of any code, error messages, or other content you submit to our service. 
                  By submitting content, you grant us a license to use, process, and analyze that content solely 
                  to provide our services to you.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Feedback</h4>
                <p className="text-gray-600 leading-relaxed">
                  Any feedback, suggestions, or ideas you provide about our service may be used by us without 
                  restriction or compensation to improve our services.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Termination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Termination</h3>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              We may terminate or suspend your account and bar access to the service immediately, without prior 
              notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Upon termination, your right to use the service will cease immediately. All provisions of the Terms 
              which by their nature should survive termination shall survive, including ownership provisions, 
              warranty disclaimers, and limitations of liability.
            </p>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Governing Law</h3>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which DebugSense AI 
              operates, without regard to its conflict of law provisions.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Any disputes arising from these terms or your use of the service shall be resolved through binding 
              arbitration in accordance with the rules of the American Arbitration Association.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Our Terms?</h2>
            <p className="text-xl text-gray-600 mb-8">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <FileText className="w-5 h-5" />
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
