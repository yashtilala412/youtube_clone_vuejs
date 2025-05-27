<template>
  <div v-if="channel" class="channel-info">
    <img :src="channel.snippet.thumbnails.default.url" alt="Channel Thumbnail" class="channel-thumbnail" />
    <div class="channel-details">
      <h3 class="channel-name">{{ channel.snippet.title }}</h3>
      <p class="subscriber-count">{{ formatSubscriberCount(channel.statistics.subscriberCount) }} subscribers</p>
    </div>
    <button class="subscribe-button">Subscribe</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  channel: {
    type: Object,
    required: false, // Not always required if channel data is loading
    default: null,
  },
});

const formatSubscriberCount = (count) => {
  if (!count) return '0';
  const num = parseInt(count);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toLocaleString();
};
</script>

<style scoped>
.channel-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.channel-thumbnail {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.channel-details {
  flex-grow: 1;
}

.channel-name {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0;
}

.subscriber-count {
  font-size: 0.9em;
  color: #606060;
  margin: 0;
}

.subscribe-button {
  background-color: #cc0000;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9em;
}

.subscribe-button:hover {
  background-color: #e60000;
}
</style>