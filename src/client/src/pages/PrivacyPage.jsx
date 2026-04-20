import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Globe, Mail, Calendar } from 'lucide-react';

const PrivacyPage = () => {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Error Messages and Code",
          text: "When you submit error messages for analysis, we temporarily process the content to provide explanations. We do not permanently store your code unless you explicitly save it to your account."
        },
        {
          subtitle: "Account Information",
          text: "When you create an account, we collect your email address, name, and optional profile information. This information is used to provide and improve our services."
        },
        {
          subtitle: "Usage Data",
          text: "We collect anonymized usage data including the number of analyses performed, languages used, and general usage patterns to improve our service."
        },
        {
          subtitle: "Technical Data",
          text: "We automatically collect technical information such as IP address, browser type, and device information for security and service optimization."
        }
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Protect Your Information",
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmitted to and from our servers is encrypted using industry-standard TLS 1.3 encryption."
        },
        {
          subtitle: "Secure Storage",
          text: "Your data is stored in secure, encrypted databases with regular security audits and penetration testing."
        },
        {
          subtitle: "Access Control",
          text: "Only authorized personnel with a legitimate business need can access your data, and all access is logged and audited."
        },
        {
          subtitle: "Data Minimization",
          text: "We only collect and retain data that is necessary to provide our services. Unnecessary data is automatically deleted."
        }
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Retention and Deletion",
      content: [
        {
          subtitle: "Error Analysis Data",
          text: "Error messages are processed temporarily and typically deleted within 24 hours unless you choose to save them to your account."
        },
        {
          subtitle: "Account Data",
          text: "Your account information is retained until you delete your account. You can request data deletion at any time."
        },
        {
          subtitle: "Analytics Data",
          text: "Anonymized analytics data is retained for 12 months to help us improve our services."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may retain data longer if required by law, for legitimate business purposes, or to protect our rights."
        }
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Third-Party Services",
      content: [
        {
          subtitle: "AI Processing",
          text: "We use third-party AI services (Groq) to process error messages. These services are bound by strict data protection agreements."
        },
        {
          subtitle: "Analytics",
          text: "We use privacy-focused analytics tools to understand how our service is used. No personal data is shared with analytics providers."
        },
        {
          subtitle: "Payment Processing",
          text: "Payment processing is handled by secure third-party payment processors. We do not store payment information on our servers."
        },
        {
          subtitle: "Communication",
          text: "Email communications may be processed by third-party email service providers for delivery purposes."
        }
      ]
    }
  ];

  const rights = [
    {
      title: "Right to Access",
      description: "You can request a copy of all personal data we hold about you."
    },
    {
      title: "Right to Rectification",
      description: "You can request correction of inaccurate personal data."
    },
    {
      title: "Right to Erasure",
      description: "You can request deletion of your personal data (right to be forgotten)."
    },
    {
      title: "Right to Portability",
      description: "You can request your data in a machine-readable format."
    },
    {
      title: "Right to Object",
      description: "You can object to processing of your personal data."
    },
    {
      title: "Right to Restrict",
      description: "You can request restriction of processing of your personal data."
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
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Privacy <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your privacy is fundamental to our mission. We're committed to protecting your data 
              and being transparent about how we use it.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Privacy Commitment</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At DebugSense AI, we believe that privacy is a fundamental human right. We've built our 
              service from the ground up with privacy-first principles, ensuring that your code and 
              personal information are always protected.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This privacy policy explains how we collect, use, and protect your information when you 
              use our services. By using DebugSense AI, you agree to the practices described in this policy.
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

          {/* Your Rights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Under GDPR and other privacy regulations, you have the following rights regarding your personal data:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {rights.map((right, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{right.title}</h4>
                  <p className="text-sm text-gray-600">{right.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have any questions about this privacy policy or want to exercise your rights, 
              please contact us:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">privacy@debugsense.ai</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">www.debugsense.ai/privacy</span>
              </div>
            </div>
          </motion.div>

          {/* Policy Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this privacy policy from time to time to reflect changes in our practices, 
              legal requirements, or business operations. When we make significant changes, we will:
            </p>
            
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">·</span>
                <span>Notify you by email or prominent notice on our website</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">·</span>
                <span>Update the "Last updated" date at the top of this policy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">·</span>
                <span>Obtain your consent for material changes if required by law</span>
              </li>
            </ul>
            
            <p className="text-gray-600 leading-relaxed mt-4">
              Your continued use of our services after any changes indicates your acceptance of the updated policy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
