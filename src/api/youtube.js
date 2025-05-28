// src/api/youtube.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; 
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Helper to make API requests
const youtubeApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

/**
 * Fetches popular videos.
 * @param {number} maxResults - Number of results to return (default: 25).
 * @returns {Promise<Object>} API response data.
 */
export const getPopularVideos = async (maxResults = 25) => {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'US', // Or your preferred region code
        maxResults: maxResults,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular videos:", error);
    throw error;
  }
};

/**
 * Searches for videos based on a query.
 * @param {string} query - The search term.
 * @param {number} maxResults - Number of results to return (default: 20).
 * @returns {Promise<Object>} API response data.
 */
export const searchVideos = async (query, maxResults = 20) => {
  try {
    const response = await youtubeApi.get('/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video', // Ensure only videos are searched
        maxResults: maxResults,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching for videos with query "${query}":`, error);
    throw error;
  }
};

/**
 * Fetches details for a specific video.
 * @param {string} videoId - The ID of the video.
 * @returns {Promise<Object>} API response data.
 */
export const getVideoDetails = async (videoId) => {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching video details for ID "${videoId}":`, error);
    throw error;
  }
};

/**
 * Fetches details for a specific channel.
 * @param {string} channelId - The ID of the channel.
 * @returns {Promise<Object>} API response data.
 */
export const getChannelDetails = async (channelId) => {
  try {
    const response = await youtubeApi.get('/channels', {
      params: {
        part: 'snippet,statistics',
        id: channelId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching channel details for ID "${channelId}":`, error);
    throw error;
  }
};

/**
 * Fetches related videos for a given video.
 * @param {string} videoId - The ID of the primary video.
 * @param {number} maxResults - Number of results to return (default: 10).
 * @returns {Promise<Object>} API response data.
 */
export const getRelatedVideos = async (videoId, maxResults = 10) => {
  try {
    const response = await youtubeApi.get('/search', {
      params: {
        part: 'snippet',
        relatedToVideoId: videoId,
        type: 'video', // Ensure only videos are returned
        maxResults: maxResults,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching related videos for ID "${videoId}":`, error);
    throw error;
  }
};

/**
 * Fetches comments for a specific video.
 * @param {string} videoId - The ID of the video.
 * @param {number} maxResults - Number of results to return (default: 20).
 * @returns {Promise<Object>} API response data.
 */
export const getCommentsOfVideo = async (videoId, maxResults = 20) => {
  try {
    const response = await youtubeApi.get('/commentThreads', {
      params: {
        part: 'snippet',
        videoId: videoId,
        maxResults: maxResults,
        textFormat: 'html', // To get formatted comment text
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for video ID "${videoId}":`, error);
    // YouTube Data API might return 403 if comments are disabled for a video
    // or if the API key lacks permission. Handle gracefully.
    return { items: [] }; // Return empty array if comments cannot be fetched
  }
};


/**
 * Fetches video categories.
 * @param {string} regionCode - Region code (e.g., 'US', 'IN').
 * @returns {Promise<Object>} API response data.
 */
export const getVideoCategories = async (regionCode = 'US') => {
  try {
    const response = await youtubeApi.get('/videoCategories', {
      params: {
        part: 'snippet',
        regionCode: regionCode,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching video categories for region "${regionCode}":`, error);
    throw error;
  }
};