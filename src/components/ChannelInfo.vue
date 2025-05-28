<template>
  <div v-if="channel" class="flex items-center gap-3 md:gap-4 border-t border-b border-gray-200 py-3 md:py-4">
    <img
      :src="channel.snippet.thumbnails.default.url"
      alt="Channel Avatar"
      class="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
    />
    <div class="flex flex-col">
      <h3 class="font-semibold text-base md:text-lg text-gray-900">{{ channel.snippet.title }}</h3>
      <p class="text-sm text-gray-600">{{ formatSubscriberCount(channel.statistics.subscriberCount) }} subscribers</p>
    </div>
    <button class="ml-auto px-4 py-2 bg-yt-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-sm md:text-base">
      Subscribe
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  channel: {
    type: Object,
    required: true,
  },
});

// Helper function to format subscriber count (e.g., 1234567 -> 1.2M)
const formatSubscriberCount = (count) => {
  if (!count) return '0';
  const num = parseInt(count);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toLocaleString();
};
</script>