<template>
  <main class="content-area video-detail-page">
    <div v-if="loading" class="loading-message">Loading video details...</div>
    <div v-else-if="error" class="error-message">Error: {{ error }}</div>
    <div v-else-if="video" class="video-container">
      <div class="video-player-wrapper">
        <iframe
          class="video-player"
          :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <h1 class="video-detail-title">{{ video.snippet.title }}</h1>

      <div class="video-stats">
        <span>{{ formatViewCount(video.statistics?.viewCount) }} views</span>
        <div class="like-dislike-buttons">
            <button class="like-button">👍 {{ formatLikes(video.statistics?.likeCount) }}</button>
            <button class="dislike-button">👎</button>
        </div>
      </div>

      <ChannelInfo :channel="channel" />

      <div class="video-description">
        <h3>Description</h3>
        <pre>{{ video.snippet.description }}</pre>
      </div>

      <CommentSection :comments="comments" />
    </div>
    <div v-else class="no-results-message">Video not found.</div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getVideoDetails, getChannelDetails, getComments } from '@/api/youtube';
import ChannelInfo from '@/components/ChannelInfo.vue';
import CommentSection from '@/components/CommentSection.vue';

// Remove this import if you see the warning: `@vue/compiler-sfc] 'defineProps' is a compiler macro and no longer needs to be imported.`
// import { defineProps } from 'vue'; 

const route = useRoute();
const video = ref(null);
const channel = ref(null);
const comments = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchVideoData = async (videoId) => {
  loading.value = true;
  error.value = null;
  video.value = null;
  channel.value = null;
  comments.value = [];

  if (!videoId) {
    error.value = 'No video ID provided.';
    loading.value = false;
    return;
  }

  try {
    const videoData = await getVideoDetails(videoId);
    video.value = videoData;

    if (videoData && videoData.snippet.channelId) {
      const channelData = await getChannelDetails(videoData.snippet.channelId);
      channel.value = channelData;
    }

    const commentsData = await getComments(videoId);
    comments.value = commentsData;

  } catch (err) {
    error.value = err.message || 'Failed to load video details.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the route params 'id'
watch(
  () => route.params.id,
  (newId) => {
    fetchVideoData(newId);
  },
  { immediate: true } // Fetch data immediately when component mounts
);

// Helper functions (copied from VideoCard for now, can be refactored to a utility file)
const formatViewCount = (count) => {
  if (!count) return '0';
  const num = parseInt(count);
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
};

const formatLikes = (count) => {
    if (!count) return '0';
    const num = parseInt(count);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toLocaleString();
};
</script>

<style scoped>
.video-detail-page {
  max-width: 1200px; /* Max width for content on detail page */
  margin: 0 auto; /* Center content */
}

.video-player-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio (9 / 16 * 100) */
  height: 0;
  overflow: hidden;
  background-color: #000;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.video-detail-title {
  font-size: 1.6em;
  font-weight: 600;
  margin: 15px 0 10px 0;
  line-height: 1.3;
}

.video-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95em;
  color: #606060;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.like-dislike-buttons {
    display: flex;
    gap: 10px;
}

.like-button, .dislike-button {
    background-color: #f0f0f0;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    color: #303030;
}

.like-button:hover, .dislike-button:hover {
    background-color: #e0e0e0;
}

.video-description {
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  line-height: 1.5;
  white-space: pre-wrap; /* Preserves formatting (line breaks) */
  font-size: 0.95em;
  color: #303030;
}

.video-description h3 {
  font-size: 1.1em;
  margin-top: 0;
  margin-bottom: 10px;
  color: #030303;
}

/* Comments section styles are in CommentSection.vue */

/* Responsive adjustments */
@media (max-width: 1024px) {
  .video-detail-page {
    padding: 0 15px;
  }
}
@media (max-width: 768px) {
    .video-detail-page {
        margin: 0;
        max-width: 100%;
        padding: 0;
    }
    .video-detail-title {
        font-size: 1.3em;
        padding: 0 15px;
    }
    .video-stats {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 15px;
    }
    .like-dislike-buttons {
        margin-top: 10px;
        width: 100%;
        justify-content: center;
    }
    .channel-info {
        padding: 15px;
    }
    .video-description {
        padding: 15px;
        margin-left: 15px;
        margin-right: 15px;
    }
    .comment-section {
        margin-left: 15px;
        margin-right: 15px;
    }
}
</style>