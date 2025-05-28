<template>
  <nav class="flex gap-3 pb-4 overflow-x-auto hide-scrollbar sticky top-0 bg-gray-100 z-40">
    <span
      class="px-4 py-2 bg-gray-200 rounded-full text-sm whitespace-nowrap cursor-pointer hover:bg-gray-300 transition-colors flex-shrink-0"
      :class="{ 'bg-gray-800 text-white hover:bg-gray-700': selectedCategory === 'all' }"
      @click="selectCategory('all')"
    >
      All
    </span>
    <span
      v-for="category in categories"
      :key="category.id"
      class="px-4 py-2 bg-gray-200 rounded-full text-sm whitespace-nowrap cursor-pointer hover:bg-gray-300 transition-colors flex-shrink-0"
      :class="{ 'bg-gray-800 text-white hover:bg-gray-700': selectedCategory === category.id }"
      @click="selectCategory(category.id)"
    >
      {{ category.snippet.title }}
    </span>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getVideoCategories } from '@/api/youtube'; // Assuming this API function exists

const categories = ref([]);
const selectedCategory = ref('all'); // 'all' initially selected

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
  // Emit event or perform action based on selected category (e.g., fetch videos for this category)
  console.log('Selected category:', categoryId);
};

onMounted(async () => {
  try {
    const response = await getVideoCategories();
    categories.value = response.items;
  } catch (error) {
    console.error("Failed to load video categories:", error);
  }
});
</script>