<template>
  <header class="bg-white p-3 md:px-5 lg:px-6 flex items-center justify-between shadow-md sticky top-0 z-50 h-14">
    <a href="/" class="font-bold text-xl md:text-2xl text-yt-red flex-shrink-0 mr-4">YouTube Clone</a>

    <div class="flex-grow max-w-sm md:max-w-xl mx-auto flex">
      <input
        type="text"
        placeholder="Search"
        class="w-full p-2.5 px-4 border border-gray-300 rounded-l-full outline-none focus:border-blue-500 text-sm md:text-base"
        v-model="searchQuery"
        @keyup.enter="performSearch"
      />
      <button
        class="p-2.5 px-4 border border-gray-300 border-l-0 rounded-r-full bg-gray-100 cursor-pointer text-gray-600 hover:bg-gray-200 text-sm md:text-base"
        @click="performSearch"
      >
        Search
      </button>
    </div>

    <div class="flex gap-4 text-xl text-gray-600 ml-4 flex-shrink-0">
      <span>★</span>
      <span>⚙</span>
    </div>
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
    searchQuery.value = '';
  }
};
</script>