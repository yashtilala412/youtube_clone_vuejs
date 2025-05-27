<template>
  <header class="app-header">
    <a href="/" class="header-logo">YouTube Clone</a>
    <div class="search-bar-container">
      <input
        type="text"
        placeholder="Search"
        class="search-input"
        v-model="searchQuery"
        @keyup.enter="performSearch"
      />
      <button class="search-button" @click="performSearch">Search</button>
    </div>
    <div class="header-icons">
      <span>&#9733;</span> <span>&#9881;</span> </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value.trim() } });
    searchQuery.value = ''; // Clear search bar after search
  }
};
</script>

<style scoped>
/* No additional styles here, rely on base.css */
</style>