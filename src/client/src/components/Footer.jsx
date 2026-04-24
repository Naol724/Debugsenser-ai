import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Product: [
      { name: 'Debug Test',  href: '/debug'     },
      { name: 'Dashboard',   href: '/dashboard' },
      { name: 'About',       href: '/about'     },
    ],
    Legal: [
      { name: 'Privacy Policy',    href: '/privacy' },
      { name: 'Terms of Service',  href: '/terms'   },
    ],
  };

  const socials = [
    { label: 'GitHub',   href: 'https://github.com'   },
    { label: 'Twitter',  href: 'https://twitter.com'  },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-[#0a0d16] border-t border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group w-fit">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold gradient-text">DebugSense AI</span>
            </Link>
            <p className="text-sm text-body max-w-xs leading-relaxed">
              AI-powered error analysis for developers and students. Understand any error instantly.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg
                             bg-slate-200 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10
                             border border-slate-300 dark:border-white/10
                             flex items-center justify-center
                             text-muted hover:text-heading
                             transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm text-body hover:text-heading transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-subtle">© {year} DebugSense AI. All rights reserved.</p>
          <p className="text-xs text-subtle flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-500 fill-current" /> for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
