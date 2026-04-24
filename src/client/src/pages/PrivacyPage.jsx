import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Globe, Mail } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const sections = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: 'Information We Collect',
    items: [
      { sub: 'Error Messages', text: 'Error messages are temporarily processed to provide explanations and not permanently stored without your permission.' },
      { sub: 'Usage Data',     text: 'Anonymized usage data (languages used, analyses count) helps us improve the service.' },
      { sub: 'Technical Data', text: 'IP address, browser type, and device info are collected for security and optimization.' },
    ],
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'How We Protect Your Data',
    items: [
      { sub: 'Encryption',       text: 'All data is encrypted in transit using TLS 1.3.' },
      { sub: 'Access Control',   text: 'Only authorized personnel with a legitimate need can access your data.' },
      { sub: 'Data Minimization',text: 'We only collect what is necessary. Unnecessary data is automatically deleted.' },
    ],
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: 'Data Retention',
    items: [
      { sub: 'Error Data',   text: 'Processed temporarily and deleted within 24 hours unless saved by you.' },
      { sub: 'Account Data', text: 'Retained until you delete your account. Deletion requests honored promptly.' },
    ],
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Third-Party Services',
    items: [
      { sub: 'Groq AI',       text: 'Error messages are processed by Groq API under strict data protection agreements.' },
      { sub: 'MongoDB Atlas', text: 'History data is stored securely in MongoDB Atlas with encryption at rest.' },
    ],
  },
];

const PrivacyPage = () => (
  <div className="page-root">
    <section className="relative overflow-hidden bg-grid bg-radial-glow">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div {...fadeUp(0)}>
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto mb-5">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-heading mb-3">Privacy <span className="gradient-text">Policy</span></h1>
          <p className="text-muted">Last updated: January 15, 2024</p>
        </motion.div>
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-5">
      {sections.map((s, i) => (
        <motion.div key={i} {...fadeUp(i * 0.08)} className="card p-6">
          <h2 className="text-base font-semibold text-heading flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              {s.icon}
            </span>
            {s.title}
          </h2>
          <div className="space-y-4">
            {s.items.map((item, j) => (
              <div key={j}>
                <p className="text-sm font-medium text-heading mb-1">{item.sub}</p>
                <p className="text-sm text-body leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div {...fadeUp(0.4)} className="card p-6">
        <h2 className="text-base font-semibold text-heading flex items-center gap-3 mb-4">
          <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Mail className="w-5 h-5" />
          </span>
          Contact Us
        </h2>
        <p className="text-sm text-body">
          Questions about this policy? Email us at{' '}
          <span className="text-indigo-600 dark:text-indigo-400">privacy@debugsense.ai</span>
        </p>
      </motion.div>
    </section>
  </div>
);

export default PrivacyPage;
