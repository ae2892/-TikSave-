
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Downloader from './components/Downloader';
import { Language } from './types';

const StaticPage: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-500">
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
      {title}
    </h1>
    <div className="prose dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-slate-400 space-y-4">
      {content}
    </div>
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Sync dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Downloader lang={lang} />;
      case 'about':
        return (
          <StaticPage 
            title="About TikSave" 
            content={
              <>
                <p>TikSave is a premium, free-to-use tool designed to help creators and social media enthusiasts download TikTok videos without the platform's intrusive watermark.</p>
                <p>We built this tool with speed and user experience in mind. Unlike other downloaders that are cluttered with ads and popups, TikSave focuses on a clean, minimal interface that gets the job done in seconds.</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8">Why use TikSave?</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>No Watermark: Get the clean, original video quality.</li>
                  <li>Fast Downloads: Process and download videos in under 3 seconds.</li>
                  <li>Privacy: We don't store your videos or track your personal information.</li>
                  <li>MP3 Support: Easily convert any video to high-quality audio.</li>
                </ul>
              </>
            } 
          />
        );
      case 'privacy':
        return (
          <StaticPage 
            title="Privacy Policy" 
            content={
              <>
                <p>Last updated: October 2023</p>
                <p>Your privacy is important to us. This policy explains how TikSave handles your data.</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Data Collection</h3>
                <p>We do not collect personal information like names, emails, or phone numbers. We do not store any of the TikTok links you paste or the videos you download.</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cookies</h3>
                <p>We use minimal functional cookies to remember your language and dark mode preferences. Third-party analytics (like Google Analytics) may be used to understand site traffic and improve performance.</p>
              </>
            } 
          />
        );
      case 'terms':
        return (
          <StaticPage 
            title="Terms of Service" 
            content={
              <>
                <p>By using TikSave, you agree to the following terms:</p>
                <ol className="list-decimal pl-5 space-y-4">
                  <li><strong>Personal Use:</strong> This tool is provided for personal, non-commercial use only. You are responsible for complying with TikTok's Terms of Service.</li>
                  <li><strong>Intellectual Property:</strong> You must respect the copyright of content creators. Do not use TikSave to infringe on the intellectual property of others.</li>
                  <li><strong>Disclaimer:</strong> TikSave is not affiliated with ByteDance or TikTok. We provide the tool "as is" and are not responsible for how it is used.</li>
                </ol>
              </>
            } 
          />
        );
      case 'contact':
        return (
          <StaticPage 
            title="Contact Us" 
            content={
              <div className="space-y-6">
                <p>Have questions or feedback? We'd love to hear from you. Reach out via email or through our support portal.</p>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold mb-2">Email Support</h4>
                  <a href="mailto:support@tiksave.io" className="text-indigo-600 dark:text-indigo-400 text-lg hover:underline">support@tiksave.io</a>
                </div>
                <p className="text-sm text-slate-500 italic">Response time is typically within 24-48 hours.</p>
              </div>
            } 
          />
        );
      default:
        return <Downloader lang={lang} />;
    }
  };

  return (
    <Layout 
      lang={lang} 
      setLang={setLang} 
      isDark={isDark} 
      setIsDark={setIsDark}
      onPageChange={setCurrentPage}
    >
      <div className="pt-8 pb-16">
        {renderPage()}
      </div>
      
      {/* Featured Section on Homepage */}
      {currentPage === 'home' && (
        <section className="bg-slate-50 dark:bg-slate-900/50 py-20 transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">How to Download TikTok Videos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Copy Link", desc: "Open TikTok and copy the video URL from the share button." },
                { step: "02", title: "Paste URL", desc: "Paste the copied link into the input field at the top of this page." },
                { step: "03", title: "Download", desc: "Click 'Download' and choose your preferred file format." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="text-4xl font-black text-indigo-600/20 dark:text-indigo-500/10 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default App;
