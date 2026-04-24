import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, Code2, Shield, Heart, Globe, Rocket,
  ArrowRight, CheckCircle2, Sparkles, BookOpen, Target, Users,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const tech = [
  { name: 'React 18',          desc: 'Modern UI with hooks and concurrent features',       color: 'text-cyan-600   dark:text-cyan-400'   },
  { name: 'Vite',              desc: 'Lightning-fast build tool and dev server',            color: 'text-yellow-600 dark:text-yellow-400' },
  { name: 'Tailwind CSS v3',   desc: 'Utility-first styling for rapid UI development',     color: 'text-sky-600    dark:text-sky-400'    },
  { name: 'Framer Motion',     desc: 'Smooth, production-ready animations',                color: 'text-pink-600   dark:text-pink-400'   },
  { name: 'Node.js + Express', desc: 'Fast, minimal backend API server',                   color: 'text-green-600  dark:text-green-400'  },
  { name: 'MongoDB',           desc: 'Flexible document database for history storage',     color: 'text-emerald-600 dark:text-emerald-400'},
  { name: 'Groq API',          desc: 'Ultra-fast LLaMA 3.3 70B inference engine',          color: 'text-violet-600 dark:text-violet-400' },
  { name: 'React Router v7',   desc: 'Client-side routing and navigation',                 color: 'text-orange-600 dark:text-orange-400' },
];

const values = [
  { icon: <Target className="w-5 h-5" />,   title: 'Developer First',    desc: 'Every decision starts with "How does this help developers?"' },
  { icon: <BookOpen className="w-5 h-5" />, title: 'Education Focused',  desc: 'We explain the why, not just the fix — so you learn and grow.' },
  { icon: <Shield className="w-5 h-5" />,   title: 'Privacy & Security', desc: 'Your code is processed securely. No data sold, ever.' },
  { icon: <Heart className="w-5 h-5" />,    title: 'Open & Honest',      desc: 'Built transparently, with community feedback at our core.' },
];

const benefits = [
  'Understand cryptic error messages instantly',
  'Learn why errors happen, not just how to fix them',
  'Get corrected code examples you can copy-paste',
  'Support for 13+ programming languages',
  'Track your debugging history and progress',
  'Free to use, no account required',
];

const AboutPage = () => (
  <div className="page-root">

    {/* ── Hero ── */}
    <section className="relative overflow-hidden bg-grid bg-radial-glow">
      <div className="absolute top-0 left-1/3 w-96 h-64 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24 text-center">
        <motion.div {...fadeUp(0)}>
          <span className="tag mb-5 inline-flex"><Sparkles className="w-3.5 h-3.5" /> About DebugSense AI</span>
        </motion.div>
        <motion.h1 {...fadeUp(0.1)} className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 sm:mb-6 text-heading">
          Built for <span className="gradient-text">Developers</span>,<br />by Developers
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="text-sm sm:text-lg text-body max-w-2xl mx-auto leading-relaxed">
          DebugSense AI was born from a simple frustration — spending hours deciphering cryptic error messages
          that should take minutes to understand. We built the tool we always wished existed.
        </motion.p>
      </div>
    </section>

    {/* ── Mission & Vision ── */}
    <section className="section-pad section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div {...fadeUp(0)} className="card p-8 hover:border-indigo-400/40 dark:hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-heading mb-3">Our Mission</h2>
            <p className="text-body leading-relaxed">
              To transform the debugging experience from frustrating to empowering — making every developer,
              from beginner to expert, more productive and confident in their code.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="card p-8 hover:border-violet-400/40 dark:hover:border-violet-500/30 transition-all duration-300">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-5">
              <Rocket className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-heading mb-3">Our Vision</h2>
            <p className="text-body leading-relaxed">
              A world where no developer gets stuck on an error for more than a few seconds.
              Where AI acts as a patient, knowledgeable mentor available 24/7 for every coder on the planet.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Why It Helps ── */}
    <section className="section-pad">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="tag mb-4 inline-flex"><Users className="w-3.5 h-3.5" /> Who It's For</span>
            <h2 className="text-3xl font-bold text-heading mb-5">Why Developers & Students Love It</h2>
            <p className="text-body mb-6 leading-relaxed">
              Whether you're a CS student hitting your first NullPointerException or a senior engineer
              debugging a production stack trace — DebugSense AI gives you clarity fast.
            </p>
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <motion.li key={i} {...fadeUp(i * 0.06)} className="flex items-center gap-3 text-sm text-body">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  {b}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="card p-8 glow-border">
            <h3 className="text-base font-semibold text-heading mb-5 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Our Values
            </h3>
            <div className="space-y-5">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-heading">{v.title}</p>
                    <p className="text-xs text-body mt-0.5 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Tech Stack ── */}
    <section className="section-pad section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <span className="tag mb-4 inline-flex"><Zap className="w-3.5 h-3.5" /> Tech Stack</span>
          <h2 className="text-3xl font-bold text-heading mb-3">Built with Modern Technology</h2>
          <p className="text-body max-w-xl mx-auto">A carefully chosen stack for performance, reliability, and developer experience.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tech.map((t, i) => (
            <motion.div key={i} {...fadeUp(i * 0.05)}
              className="card p-5 hover:border-slate-300 dark:hover:border-white/15 hover:-translate-y-1 transition-all duration-300"
            >
              <p className={`text-sm font-bold mb-1 ${t.color}`}>{t.name}</p>
              <p className="text-xs text-body leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="section-pad">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeUp()}
          className="relative overflow-hidden rounded-3xl p-12
                     bg-gradient-to-br from-indigo-50 to-violet-50
                     dark:from-indigo-500/10 dark:to-violet-500/10
                     border border-indigo-200 dark:border-indigo-500/20"
        >
          <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20" />
          <div className="relative">
            <Globe className="w-10 h-10 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-heading mb-3">Ready to Debug Smarter?</h2>
            <p className="text-body mb-7">Join developers worldwide who are fixing errors faster and learning more.</p>
            <Link to="/debug" className="btn-primary inline-flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Try DebugSense AI Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

  </div>
);

export default AboutPage;
