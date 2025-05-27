<template>
  <main class="content-area">
    <h1 style="margin-top: 0; font-size: 1.8em; color: #303030;">Trending Videos</h1>
    <div v-if="loading" class="loading-message">Loading popular videos...</div>
    <div v-else-if="error" class="error-message">Error: {{ error }}</div>
    <div v-else class="video-grid">
      <VideoCard
        v-for="video in popularVideos"
        :key="video.id"
        :video="video"
      />
    </div>
    <div v-if="!loading && !error && popularVideos.length === 0" class="no-results-message">
      No popular videos found.
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPopularVideos } from '@/api/youtube';
import VideoCard from '@/components/VideoCard.vue';

const popularVideos = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const videos = await getPopularVideos();
    popularVideos.value = videos;
  } catch (err) {
    error.value = err.message || 'Failed to fetch popular videos.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Styles for the video grid */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Responsive grid */
  gap: 20px;
  padding: 10px 0;
}

.loading-message, .error-message, .no-results-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #555;
}

.error-message {
  color: #ff0000;
}
</style>