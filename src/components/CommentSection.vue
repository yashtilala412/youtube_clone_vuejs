<template>
  <div class="mt-8 md:mt-10 lg:mt-12">
    <h3 class="text-xl font-semibold mb-5">{{ comments.length }} Comments</h3>
    <div v-if="comments.length > 0" class="flex flex-col gap-5">
      <div v-for="commentThread in comments" :key="commentThread.id" class="flex items-start gap-4">
        <img
          :src="commentThread.snippet.topLevelComment.snippet.authorProfileImageUrl"
          alt="Avatar"
          class="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div class="flex-grow">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-semibold text-sm">{{ commentThread.snippet.topLevelComment.snippet.authorDisplayName }}</span>
            <span class="text-xs text-gray-600">{{ formatDate(commentThread.snippet.topLevelComment.snippet.publishedAt) }}</span>
          </div>
          <p class="text-sm leading-relaxed m-0" v-html="commentThread.snippet.topLevelComment.snippet.textDisplay"></p>
          <div class="text-xs text-gray-600 mt-1">
            <span>Likes: {{ commentThread.snippet.topLevelComment.snippet.likeCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-600">
      <p>No comments found for this video.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

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