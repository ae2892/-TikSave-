
import React, { ReactNode } from 'react';
import { Language, TranslationStrings } from '../types';
import { translations } from '../translations';
import { SunIcon, MoonIcon, GlobeIcon } from './Icons';

interface LayoutProps {
  children: ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang, isDark, setIsDark, onPageChange }) => {
  const t = translations[lang];

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <nav className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer space-x-2"
            onClick={() => onPageChange('home')}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
            <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">TikSave</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center">
                <GlobeIcon />
                <span className="ml-1 hidden sm:inline uppercase text-sm font-medium">{lang}</span>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 shadow-xl rounded-xl py-2 hidden group-hover:block border border-slate-100 dark:border-slate-700">
                {(Object.keys(translations) as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`w-full text-left px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 dark:text-white text-sm transition-colors ${lang === l ? 'text-indigo-600 font-semibold' : ''}`}
                  >
                    {l.toUpperCase()} - {l === 'en' ? 'English' : l === 'es' ? 'Español' : l === 'fr' ? 'Français' : l === 'de' ? 'Deutsch' : l === 'hi' ? 'Hindi' : 'Português'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
                <span className="text-lg font-bold dark:text-white">TikSave</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                The best online tool to download TikTok videos without watermark. Fast, free, and secure.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><button onClick={() => onPageChange('about')} className="hover:text-indigo-600">About</button></li>
                <li><button onClick={() => onPageChange('privacy')} className="hover:text-indigo-600">Privacy Policy</button></li>
                <li><button onClick={() => onPageChange('terms')} className="hover:text-indigo-600">Terms of Service</button></li>
                <li><button onClick={() => onPageChange('contact')} className="hover:text-indigo-600">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Support</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Facing issues? Contact our team at support@tiksave.io
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-500 italic mb-4">
              {t.footerDisclaimer}
            </p>
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} TikSave. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
