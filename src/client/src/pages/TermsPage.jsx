import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Users, AlertCircle } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const sections = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Acceptance of Terms',
    items: [
      { sub: 'Agreement', text: 'By using DebugSense AI, you accept and agree to be bound by these terms. If you do not agree, please do not use this service.' },
      { sub: 'Modifications', text: 'We reserve the right to amend these terms at any time. Continued use constitutes acceptance of any modifications.' },
    ],
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'User Conduct',
    items: [
      { sub: 'Prohibited Uses', text: 'You may not use our service for illegal activities, harassment, spam, or to transmit malicious code.' },
      { sub: 'Content Responsibility', text: 'You are solely responsible for any code or error messages you submit. We do not claim ownership of your content.' },
    ],
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Service Terms',
    items: [
      { sub: 'Service Description', text: 'DebugSense AI provides AI-powered error analysis. We strive for accuracy but cannot guarantee perfect results.' },
      { sub: 'Availability', text: 'We strive for high availability but do not guarantee uninterrupted service.' },
    ],
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: 'Limitations & Disclaimers',
    items: [
      { sub: 'Disclaimer', text: 'DebugSense AI is provided "as is" without warranties of any kind.' },
      { sub: 'Liability', text: 'We are not liable for any indirect, incidental, or consequential damages from your use of our service.' },
    ],
  },
];

const TermsPage = () => (
  <div className="min-h-screen bg-[#0f1117]">
    <section className="relative overflow-hidden bg-grid bg-radial-glow">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div {...fadeUp(0)}>
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-5">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Terms of <span className="gradient-text">Service</span></h1>
          <p className="text-gray-500">Last updated: January 15, 2024</p>
        </motion.div>
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-5">
      {sections.map((s, i) => (
        <motion.div key={i} {...fadeUp(i * 0.08)} className="card p-6">
          <h2 className="text-base font-semibold text-white flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
              {s.icon}
            </span>
            {s.title}
          </h2>
          <div className="space-y-4">
            {s.items.map((item, j) => (
              <div key={j}>
                <p className="text-sm font-medium text-gray-300 mb-1">{item.sub}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  </div>
);

export default TermsPage;
