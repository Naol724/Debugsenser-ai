import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Code,
  BookOpen,
  MessageSquare,
  Star,
  Shield,
  Zap,
  Rocket,
  ChevronRight,
  Heart,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features', icon: <Zap className="w-4 h-4" /> },
      { name: 'How It Works', href: '#how-it-works', icon: <Code className="w-4 h-4" /> },
      { name: 'Pricing', href: '/pricing', icon: <Star className="w-4 h-4" /> },
      { name: 'API Docs', href: '/docs', icon: <BookOpen className="w-4 h-4" /> },
    ],
    resources: [
      { name: 'Documentation', href: '/docs', icon: <BookOpen className="w-4 h-4" /> },
      { name: 'Blog', href: '/blog', icon: <MessageSquare className="w-4 h-4" /> },
      { name: 'Tutorials', href: '/tutorials', icon: <Code className="w-4 h-4" /> },
      { name: 'Support', href: '/contact', icon: <MessageSquare className="w-4 h-4" /> },
    ],
    company: [
      { name: 'About Us', href: '/about', icon: <Shield className="w-4 h-4" /> },
      { name: 'Contact', href: '/contact', icon: <Mail className="w-4 h-4" /> },
      { name: 'Careers', href: '/careers', icon: <Rocket className="w-4 h-4" /> },
      { name: 'Press Kit', href: '/press', icon: <Star className="w-4 h-4" /> },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy', icon: <Shield className="w-4 h-4" /> },
      { name: 'Terms of Service', href: '/terms', icon: <BookOpen className="w-4 h-4" /> },
      { name: 'Cookie Policy', href: '/cookies', icon: <Star className="w-4 h-4" /> },
      { name: 'GDPR', href: '/gdpr', icon: <Shield className="w-4 h-4" /> },
    ]
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: <ExternalLink className="w-5 h-5" /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <ExternalLink className="w-5 h-5" /> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <ExternalLink className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stay Updated with DebugSense AI
            </h3>
            <p className="text-gray-300 mb-8">
              Get the latest updates, tips, and exclusive offers delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Subscribe
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  D
                </div>
                <div>
                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DebugSense AI
                  </h4>
                  <p className="text-xs text-gray-400">
                    Smart Error Explainer
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transform frustrating error messages into clear, actionable solutions with advanced AI technology.
              </p>
              
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-6 text-blue-400">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                  >
                    <span className="text-gray-500 group-hover:text-blue-400 transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-6 text-purple-400">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                  >
                    <span className="text-gray-500 group-hover:text-purple-400 transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-6 text-green-400">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                  >
                    <span className="text-gray-500 group-hover:text-green-400 transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-semibold text-lg mb-6 text-orange-400">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                  >
                    <span className="text-gray-500 group-hover:text-orange-400 transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {currentYear} DebugSense AI.</span>
              <span>All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for developers worldwide</span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
