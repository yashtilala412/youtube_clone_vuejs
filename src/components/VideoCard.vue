<template>
  <div class="video-card" @click="goToVideo">
    <img :src="thumbnailUrl" :alt="video.snippet.title" class="video-thumbnail" />
    <div class="video-info">
      <h3 class="video-title">{{ video.snippet.title }}</h3>
      <p class="video-channel">{{ video.snippet.channelTitle }}</p>
      <p class="video-views-date">{{ formatViewCount(video.statistics?.viewCount) }} views • {{ formatDate(video.snippet.publishedAt) }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

// Determine which thumbnail URL to use
const thumbnailUrl = props.video.snippet.thumbnails.medium?.url ||
                     props.video.snippet.thumbnails.high?.url ||
                     props.video.snippet.thumbnails.default?.url;

// Navigate to video detail page
const goToVideo = () => {
  // Use video.id.videoId for search results, video.id for popular videos
  const videoId = props.video.id?.videoId || props.video.id;
  if (videoId) {
    router.push({ name: 'video-detail', params: { id: videoId } });
  }
};

// Helper function to format view count (e.g., 1234567 -> 1.2M)
const formatViewCount = (count) => {
  if (!count) return '0 views';
  const num = parseInt(count);
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B views';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M views';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K views';
  return num.toLocaleString() + ' views';
};

// Helper function to format date (e.g., 2 days ago)
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30);
  const diffYears = Math.ceil(diffDays / 365);

  if (diffDays < 1) return 'Today';
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
};
</script>

<style scoped>
/* Styles for VideoCard.vue */
.video-card {
  cursor: pointer;
  max-width: 360px; /* Typical video card width */
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.video-card:hover {
  transform: translateY(-5px);
}

.video-thumbnail {
  width: 100%;
  height: 200px; /* Fixed height for thumbnails */
  object-fit: cover; /* Ensures image covers area */
  display: block;
}

.video-info {
  padding: 10px;
}

.video-title {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0 0 5px 0;
  height: 2.8em; /* Limit to 2 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.video-channel {
  font-size: 0.9em;
  color: #606060;
  margin-bottom: 3px;
}

.video-views-date {
  font-size: 0.85em;
  color: #606060;
}
</style>