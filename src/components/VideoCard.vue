<template>
  <div
    class="cursor-pointer max-w-sm w-full bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.02]"
    @click="goToVideo"
  >
    <img :src="thumbnailUrl" :alt="video.snippet.title" class="w-full h-48 object-cover block" />
    <div class="p-3">
      <h3 class="text-base font-semibold mb-1 leading-tight line-clamp-2">{{ video.snippet.title }}</h3>
      <p class="text-sm text-gray-600 mb-0.5">{{ video.snippet.channelTitle }}</p>
      <p class="text-xs text-gray-600">{{ formatViewCount(video.statistics?.viewCount) }} • {{ formatDate(video.snippet.publishedAt) }}</p>
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

// Determine which thumbnail URL to use (prefer medium, then high, then default)
const thumbnailUrl = props.video.snippet.thumbnails.medium?.url ||
                     props.video.snippet.thumbnails.high?.url ||
                     props.video.snippet.thumbnails.default?.url;

// Navigate to video detail page
const goToVideo = () => {
  const videoId = props.video.id?.videoId || props.video.id; // Handles both search results and popular videos
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