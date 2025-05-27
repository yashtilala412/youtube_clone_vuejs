<template>
  <main class="content-area">
    <h1 style="margin-top: 0; font-size: 1.8em; color: #303030;">
      Search Results for "{{ currentQuery }}"
    </h1>
    <div v-if="loading" class="loading-message">Searching for videos...</div>
    <div v-else-if="error" class="error-message">Error: {{ error }}</div>
    <div v-else class="video-list-vertical">
      <div v-for="video in searchResults" :key="video.id.videoId" class="search-result-item">
        <VideoCard :video="video" />
      </div>
    </div>
    <div v-if="!loading && !error && searchResults.length === 0" class="no-results-message">
      No videos found for "{{ currentQuery }}".
    </div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { searchVideos } from '@/api/youtube';
import VideoCard from '@/components/VideoCard.vue';

const route = useRoute();
const searchResults = ref([]);
const loading = ref(false);
const error = ref(null);
const currentQuery = ref('');

const fetchSearchResults = async (query) => {
  loading.value = true;
  error.value = null;
  searchResults.value = []; // Clear previous results
  currentQuery.value = query;

  if (!query) {
    loading.value = false;
    return;
  }

  try {
    const results = await searchVideos(query);
    // Filter out non-video results if any, though type: 'video' should handle it
    searchResults.value = results.filter(item => item.id.kind === 'youtube#video');
  } catch (err) {
    error.value = err.message || 'Failed to fetch search results.';
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the route query parameter 'q'
watch(
  () => route.query.q,
  (newQuery) => {
    fetchSearchResults(newQuery);
  },
  { immediate: true } // Run immediately when component mounts
);

onMounted(() => {
  // If component is mounted with a query, fetch immediately
  if (route.query.q) {
    fetchSearchResults(route.query.q);
  }
});
</script>

<style scoped>
/* Specific styles for search results if they differ from home grid */
.video-list-vertical {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Space between search result items */
}

/* For search results, we might want a different layout than the grid,
   or just make VideoCard responsive enough to handle both.
   For simplicity, keeping it flexible. */
.search-result-item .video-card {
  max-width: none; /* Allow full width for search results */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.search-result-item .video-thumbnail {
    width: 240px; /* Wider thumbnail for horizontal layout */
    height: 135px; /* 16:9 aspect ratio */
    margin-right: 15px;
    flex-shrink: 0;
}

.search-result-item .video-info {
    padding: 0;
}

.search-result-item .video-title {
    font-size: 1.2em; /* Slightly larger title for search results */
    height: auto; /* Allow more lines */
    -webkit-line-clamp: unset;
}

/* Make VideoCard adjust for smaller screens in search results */
@media (max-width: 768px) {
    .search-result-item .video-card {
        flex-direction: column; /* Stack vertically on small screens */
    }
    .search-result-item .video-thumbnail {
        width: 100%;
        height: 180px;
        margin-right: 0;
        margin-bottom: 10px;
    }
    .search-result-item .video-info {
        padding: 10px;
    }
}
</style>