
import { ApiResponse, TikTokVideoData } from '../types';

/**
 * Service to fetch TikTok video metadata using public, free API (tikwm.com)
 */
export const fetchTikTokData = async (videoUrl: string): Promise<TikTokVideoData> => {
  try {
    const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}&hd=1`);
    const result: ApiResponse = await response.json();

    if (result.code === 0 && result.data) {
      return result.data;
    } else {
      throw new Error(result.msg || 'Failed to fetch video data');
    }
  } catch (error) {
    console.error('Service Error:', error);
    throw error;
  }
};

export const isValidTikTokUrl = (url: string): boolean => {
  const pattern = /https?:\/\/(?:www\.)?(?:tiktok\.com|vt\.tiktok\.com|vm\.tiktok\.com)\/.*$/;
  return pattern.test(url);
};
