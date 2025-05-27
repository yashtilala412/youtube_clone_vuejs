// src/api/youtube.js
import axios from 'axios';

// Access the API key from environment variables
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Create an Axios instance with base URL and API key
const youtubeApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

/**
 * Fetches popular videos.
 * @param {number} maxResults - Number of results to fetch (default: 20)
 * @param {string} regionCode - Region for trending videos (default: 'US')
 * @returns {Array} List of video items.
 */
export const getPopularVideos = async (maxResults = 20, regionCode = 'US') => {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: regionCode,
        maxResults: maxResults,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    throw error; // Re-throw to allow component to handle
  }
};

/**
 * Searches for videos.
 * @param {string} query - The search query.
 * @param {number} maxResults - Number of results to fetch (default: 20)
 * @returns {Array} List of search result items.
 */
export const searchVideos = async (query, maxResults = 20) => {
  try {
    const response = await youtubeApi.get('/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video', // Only search for videos
        maxResults: maxResults,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
};

/**
 * Fetches details for a specific video.
 * @param {string} videoId - The ID of the video.
 * @returns {Object} Video details.
 */
export const getVideoDetails = async (videoId) => {
  try {
    const response = await youtubeApi.get('/videos', {
      params: {
        part: 'snippet,statistics,contentDetails', // include contentDetails for duration
        id: videoId,
      },
    });
    return response.data.items[0]; // Should return a single video object
  } catch (error) {
    console.error('Error fetching video details for ID:', videoId, error);
    throw error;
  }
};

/**
 * Fetches details for a specific channel.
 * @param {string} channelId - The ID of the channel.
 * @returns {Object} Channel details.
 */
export const getChannelDetails = async (channelId) => {
  try {
    const response = await youtubeApi.get('/channels', {
      params: {
        part: 'snippet,statistics',
        id: channelId,
      },
    });
    return response.data.items[0]; // Should return a single channel object
  } catch (error) {
    console.error('Error fetching channel details for ID:', channelId, error);
    throw error;
  }
};

/**
 * Fetches comments for a specific video.
 * @param {string} videoId - The ID of the video.
 * @param {number} maxResults - Number of comments to fetch (default: 20)
 * @returns {Array} List of comment thread items.
 */
export const getComments = async (videoId, maxResults = 20) => {
  try {
    const response = await youtubeApi.get('/commentThreads', {
      params: {
        part: 'snippet',
        videoId: videoId,
        maxResults: maxResults,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching comments for video ID:', videoId, error);
    // YouTube Data API has limitations on comments. Some videos might not have comments enabled,
    // or the API might return an error if too many requests are made.
    return []; // Return empty array on error for comments to not break the page
  }
};

/**
 * Fetches a list of video categories.
 * @param {string} regionCode - Region for categories (default: 'US')
 * @returns {Array} List of video category items.
 */
export const getVideoCategories = async (regionCode = 'US') => {
  try {
    const response = await youtubeApi.get('/videoCategories', {
      params: {
        part: 'snippet',
        regionCode: regionCode,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching video categories:', error);
    throw error;
  }
};