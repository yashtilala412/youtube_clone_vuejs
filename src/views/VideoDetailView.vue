<template>
  <div class="flex flex-col lg:flex-row gap-6 p-4 md:p-6 lg:p-8">
    <div class="flex-1 lg:max-w-3xl">
      <div v-if="video" class="mb-6">
        <div class="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden">
          <iframe
            :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        <h1 class="text-xl md:text-2xl font-bold mt-4 mb-2">{{ video.snippet.title }}</h1>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-4 gap-2 sm:gap-4">
          <div class="flex items-center gap-4">
            <span>{{ formatViewCount(video.statistics?.viewCount) }}</span>
            <span>{{ formatDate(video.snippet.publishedAt) }}</span>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-2 justify-end sm:justify-normal">
            <span class="flex items-center"><span class="mr-1">👍</span> {{ formatLikeCount(video.statistics?.likeCount) }}</span>
            <span class="flex items-center"><span class="mr-1">👎</span> Dislike</span>
            <span class="flex items-center"><span class="mr-1">🔗</span> Share</span>
            <span class="flex items-center"><span class="mr-1">📥</span> Download</span>
          </div>
        </div>
        <ChannelInfo :channel="channel" />
        <p class="text-sm mt-4 leading-relaxed whitespace-pre-wrap">{{ video.snippet.description }}</p>
      </div>
      <div v-else-if="loading" class="text-center text-gray-500 text-lg py-10">
        Loading video details...
      </div>
      <div v-else class="text-center text-gray-500 text-lg py-10">
        Video not found.
      </div>
      <CommentSection :comments="comments" />
    </div>

    <div class="lg:w-80 lg:flex-shrink-0">
      <h3 class="text-lg font-semibold mb-4 hidden lg:block">Up Next</h3>
      <div v-if="relatedVideos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
        <VideoCard
          v-for="relatedVideo in relatedVideos"
          :key="relatedVideo.id.videoId"
          :video="relatedVideo"
        />
      </div>
      <div v-else-if="loading" class="text-center text-gray-500 text-base py-5">
        Loading related videos...
      </div>
      <div v-else class="text-center text-gray-500 text-base py-5">
        No related videos found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getVideoDetails, getChannelDetails, getRelatedVideos, getCommentsOfVideo } from '@/api/youtube';
import ChannelInfo from '@/components/ChannelInfo.vue';
import CommentSection from '@/components/CommentSection.vue';
import VideoCard from '@/components/VideoCard.vue';

const route = useRoute();
const video = ref(null);
const channel = ref(null);
const comments = ref([]);
const relatedVideos = ref([]);
const loading = ref(true);

const fetchVideoData = async (videoId) => {
  loading.value = true;
  video.value = null;
  channel.value = null;
  comments.value = [];
  relatedVideos.value = [];

  try {
    // Fetch video details
    const videoResponse = await getVideoDetails(videoId);
    video.value = videoResponse.items[0];

    if (video.value) {
      // Fetch channel details
      const channelResponse = await getChannelDetails(video.value.snippet.channelId);
      channel.value = channelResponse.items[0];

      // Fetch comments
      const commentsResponse = await getCommentsOfVideo(videoId);
      comments.value = commentsResponse.items;

      // Fetch related videos
      const relatedVideosResponse = await getRelatedVideos(videoId);
      // Filter out non-video results from related videos
      relatedVideos.value = relatedVideosResponse.items.filter(item => item.id.kind === 'youtube#video');
    }
  } catch (error) {
    console.error("Failed to load video details:", error);
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the route params (video ID)
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await fetchVideoData(newId);
    }
  },
  { immediate: true } // Run immediately on component mount
);


// Helper functions (for formatting counts and dates)
const formatViewCount = (count) => {
  if (!count) return '0 views';
  const num = parseInt(count);
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B views';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M views';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K views';
  return num.toLocaleString() + ' views';
};

const formatLikeCount = (count) => {
  if (!count) return '0';
  const num = parseInt(count);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toLocaleString();
};

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