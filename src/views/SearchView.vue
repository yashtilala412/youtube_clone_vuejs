<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h2 class="text-2xl font-bold mb-6">Search Results for "{{ searchQuery }}"</h2>
    <div v-if="searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <VideoCard
        v-for="video in searchResults"
        :key="video.id.videoId"
        :video="video"
        class="max-w-full mx-auto"
      />
    </div>
    <div v-else-if="loading" class="text-center text-gray-500 text-lg py-10">
      Loading search results...
    </div>
    <div v-else class="text-center text-gray-500 text-lg py-10">
      No videos found for "{{ searchQuery }}".
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { searchVideos } from '@/api/youtube';
import VideoCard from '@/components/VideoCard.vue';

const route = useRoute();
const searchResults = ref([]);
const searchQuery = ref('');
const loading = ref(true);

const performSearch = async (query) => {
  loading.value = true;
  try {
    const response = await searchVideos(query);
    // Filter out non-video results if any (e.g., channels, playlists)
    searchResults.value = response.items.filter(item => item.id.kind === 'youtube#video');
  } catch (error) {
    console.error("Failed to search videos:", error);
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the route query parameter 'q'
watch(
  () => route.query.q,
  async (newQuery) => {
    if (newQuery) {
      searchQuery.value = newQuery;
      await performSearch(newQuery);
    }
  },
  { immediate: true } // Run immediately on component mount
);

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q;
  }
});
</script>