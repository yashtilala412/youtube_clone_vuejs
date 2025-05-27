<template>
  <div class="comment-section">
    <h3>{{ comments.length }} Comments</h3>
    <div v-if="comments.length > 0" class="comment-list">
      <div v-for="commentThread in comments" :key="commentThread.id" class="comment-item">
        <img
          :src="commentThread.snippet.topLevelComment.snippet.authorProfileImageUrl"
          alt="Avatar"
          class="comment-avatar"
        />
        <div class="comment-content">
          <div class="comment-author-info">
            <span class="comment-author">{{ commentThread.snippet.topLevelComment.snippet.authorDisplayName }}</span>
            <span class="comment-published">{{ formatDate(commentThread.snippet.topLevelComment.snippet.publishedAt) }}</span>
          </div>
          <p class="comment-text" v-html="commentThread.snippet.topLevelComment.snippet.textDisplay"></p>
          <div class="comment-actions">
            <span>Likes: {{ commentThread.snippet.topLevelComment.snippet.likeCount }}</span>
            </div>
        </div>
      </div>
    </div>
    <div v-else>
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

// Helper function to format date (e.g., 2 days ago) - copied from VideoCard
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
.comment-section {
  margin-top: 30px;
}

.comment-section h3 {
  font-size: 1.3em;
  margin-bottom: 20px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex-grow: 1;
}

.comment-author-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
}

.comment-author {
  font-weight: 600;
  font-size: 0.95em;
}

.comment-published {
  font-size: 0.85em;
  color: #606060;
}

.comment-text {
  font-size: 0.95em;
  line-height: 1.4;
  margin: 0;
}

.comment-actions {
  font-size: 0.85em;
  color: #606060;
  margin-top: 5px;
}
</style>