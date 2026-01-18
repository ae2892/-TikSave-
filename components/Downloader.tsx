
import React, { useState, useEffect } from 'react';
import { TikTokVideoData, Language } from '../types';
import { translations } from '../translations';
import { fetchTikTokData, isValidTikTokUrl } from '../services/tiktokService';
import { DownloadIcon, VideoIcon, AudioIcon, CheckIcon, AlertIcon } from './Icons';

interface DownloaderProps {
  lang: Language;
}

const Downloader: React.FC<DownloaderProps> = ({ lang }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TikTokVideoData | null>(null);
  const [copied, setCopied] = useState(false);

  const t = translations[lang];

  const handleDownload = async () => {
    setError(null);
    setResult(null);

    if (!url) return;

    if (!isValidTikTokUrl(url)) {
      setError(t.errorInvalid);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchTikTokData(url);
      setResult(data);
    } catch (err: any) {
      setError(err.message || t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setResult(null);
    setError(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="relative mb-8">
        <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 border-2 border-transparent focus-within:border-indigo-500 transition-all duration-300">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.placeholder}
            className="flex-grow w-full px-6 py-4 bg-transparent outline-none text-slate-800 dark:text-white text-lg placeholder-slate-400"
            onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
          />
          <div className="flex gap-2 w-full sm:w-auto">
             {url && (
              <button
                onClick={handleClear}
                className="px-4 py-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                ✕
              </button>
             )}
            <button
              onClick={handleDownload}
              disabled={loading || !url}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold px-10 py-4 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t.downloadBtn}</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  <DownloadIcon />
                  {t.downloadBtn}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl border border-red-100 dark:border-red-900/50">
            <AlertIcon />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute inset-0 border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 animate-pulse">{t.loading}</p>
        </div>
      )}

      {result && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 dark:border-slate-700">
            <div className="md:w-1/3 relative group">
              <img 
                src={result.cover} 
                alt={result.title} 
                className="w-full h-full object-cover aspect-[9/16] md:aspect-auto"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <VideoIcon />
              </div>
            </div>
            
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={result.author.avatar} alt={result.author.nickname} className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-slate-700" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight">@{result.author.unique_id}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{result.author.nickname}</p>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-8 line-clamp-3">
                  {result.title || "No description provided."}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={result.play}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all"
                >
                  <DownloadIcon />
                  {t.withoutWM}
                </a>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={result.wmplay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold py-4 px-6 rounded-xl transition-all"
                  >
                    <VideoIcon />
                    {t.withWM}
                  </a>
                  <a
                    href={result.music}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold py-4 px-6 rounded-xl transition-all"
                  >
                    <AudioIcon />
                    {t.downloadMP3}
                  </a>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-3 text-indigo-600 dark:text-indigo-400 font-medium py-3 hover:underline transition-all"
                >
                  {copied ? (
                    <span className="flex items-center gap-2 text-green-500"><CheckIcon /> {t.copySuccess}</span>
                  ) : (
                    <span>Share This Tool</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Downloader;
