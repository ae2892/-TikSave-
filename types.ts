
export interface TikTokVideoData {
  id: string;
  title: string;
  cover: string;
  author: {
    nickname: string;
    unique_id: string;
    avatar: string;
  };
  play: string;        // No watermark
  wmplay: string;      // Watermark
  music: string;       // MP3
  duration: number;
}

export interface ApiResponse {
  code: number;
  msg: string;
  data?: TikTokVideoData;
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi' | 'pt';

export interface TranslationStrings {
  title: string;
  subtitle: string;
  placeholder: string;
  downloadBtn: string;
  loading: string;
  errorInvalid: string;
  errorGeneric: string;
  withoutWM: string;
  withWM: string;
  downloadMP3: string;
  footerDisclaimer: string;
  about: string;
  privacy: string;
  terms: string;
  contact: string;
  copySuccess: string;
  pastLink: string;
}
