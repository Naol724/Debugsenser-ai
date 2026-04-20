import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Code2, BookOpen, Shield, Globe, Rocket,
  ArrowRight, CheckCircle2, Copy, Sparkles, Terminal,
  ChevronRight, BarChart3, Clock
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

const features = [
  { icon: <Zap className="w-5 h-5" />, title: 'Instant Analysis', desc: 'AI-powered explanations for any error in seconds, not hours.' },
  { icon: <Code2 className="w-5 h-5" />, title: 'Code Examples', desc: 'Get corrected code snippets you can copy directly into your project.' },
  { icon: <BookOpen className="w-5 h-5" />, title: 'Learn & Grow', desc: 'Understand why errors happen and how to prevent them next time.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Privacy First', desc: 'Your code is processed securely. No data stored without permission.' },
  { icon: <Globe className="w-5 h-5" />, title: '13+ Languages', desc: 'JavaScript, Python, Java, C++, Go, Rust, TypeScript and more.' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Error History', desc: 'Track all your past analyses in a beautiful dashboard.' },
];

const steps = [
  { n: '01', icon: <Copy className="w-6 h-6" />, title: 'Paste Your Error', desc: 'Copy your error message, stack trace, or compiler output and paste it in.' },
  { n: '02', icon: <Sparkles className="w-6 h-6" />, title: 'AI Analyzes', desc: 'Our LLaMA-powered AI understands the context and root cause instantly.' },
  { n: '03', icon: <CheckCircle2 className="w-6 h-6" />, title: 'Get the Fix', desc: 'Receive a clear explanation, step-by-step fix, and corrected code.' },
];

const HomePage = () => (
  <div className="min-h-screen bg-[#0f1117]">
    {/* Hero */}
    <section className="relative overflow-hidden bg-grid bg-radial-glow">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
        <motion.div {...fadeUp(0)}>
          <span className="tag mb-6 inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by LLaMA 3.3 · 70B
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Debug Errors with{' '}
          <span className="gradient-text">AI Precision</span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Paste any error message and get an instant, beginner-friendly explanation —
          what it means, why it happened, and exactly how to fix it.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/debug" className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-3.5">
            <Rocket className="w-5 h-5" />
            Start Debugging Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/dashboard" className="btn-ghost flex items-center justify-center gap-2 text-base px-8 py-3.5">
            <BarChart3 className="w-5 h-5" />
            View Dashboard
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500">
          {['Instant Analysis', '13+ Languages', 'Privacy First', 'Free to Use'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* Hero terminal mockup */}
        <motion.div {...fadeUp(0.5)} className="mt-16 max-w-2xl mx-auto">
          <div className="card glow-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-gray-600 font-mono">error.log</span>
            </div>
            <div className="p-5 font-mono text-sm text-left space-y-2">
              <p className="text-red-400">TypeError: Cannot read properties of undefined</p>
              <p className="text-gray-600">{'  '}at processData (app.js:42:15)</p>
              <p className="text-gray-600">{'  '}at main (app.js:78:3)</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-indigo-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Analysis complete — 3 issues found, fix ready
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Why Choose DebugSense */}
    <section className="section-pad bg-[#0d1020]">
      <div className="container-max">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="tag mb-4 inline-flex">Features</span>
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose DebugSense?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Everything you need to debug smarter, learn faster, and ship with confidence.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)}
              className="card p-6 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500/20 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="section-pad">
      <div className="container-max">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="tag mb-4 inline-flex">Process</span>
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Three simple steps from confused to coding again.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.12)} className="card p-8 text-center hover:border-indigo-500/30 transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-600 rounded-full text-xs font-bold text-white">
                {s.n}
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-5 mx-auto">
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-pad">
      <div className="container-max">
        <motion.div {...fadeUp()}
          className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.15) 100%)', border: '1px solid rgba(99,102,241,0.25)' }}
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 blur-3xl" />
          <div className="relative">
            <Terminal className="w-12 h-12 text-indigo-400 mx-auto mb-5" />
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Test Your Error?</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              Paste your error message and get an AI-powered explanation in seconds. No signup required.
            </p>
            <Link to="/debug" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4">
              <Zap className="w-5 h-5" />
              Analyze My Error Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-gray-600 text-sm mt-4">Free forever · No credit card needed</p>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default HomePage;
