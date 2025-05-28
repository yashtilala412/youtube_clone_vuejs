<template>
  <div class="p-4 md:p-6 lg:p-8">
    <h2 class="text-2xl font-bold mb-6">Popular Videos</h2>
    <div v-if="popularVideos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <VideoCard
        v-for="video in popularVideos"
        :key="video.id"
        :video="video"
      />
    </div>
    <div v-else-if="loading" class="text-center text-gray-500 text-lg py-10">
      Loading popular videos...
    </div>
    <div v-else class="text-center text-gray-500 text-lg py-10">
      No popular videos found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPopularVideos } from '@/api/youtube';
import VideoCard from '@/components/VideoCard.vue';

const popularVideos = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await getPopularVideos();
    popularVideos.value = response.items;
  } catch (error) {
    console.error("Failed to load popular videos:", error);
    // Optionally, display an error message to the user
  } finally {
    loading.value = false;
  }
});
</script>