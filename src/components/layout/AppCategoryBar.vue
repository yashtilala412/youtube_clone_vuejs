<template>
  <nav class="app-category-bar">
    <div
      class="category-pill"
      :class="{ active: selectedCategory === 'all' }"
      @click="selectCategory('all')"
    >
      All
    </div>
    <div
      v-for="category in categories"
      :key="category.id"
      class="category-pill"
      :class="{ active: selectedCategory === category.id }"
      @click="selectCategory(category.id)"
    >
      {{ category.snippet.title }}
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getVideoCategories } from '@/api/youtube';
import { useRouter } from 'vue-router'; // To potentially filter videos on home page

const categories = ref([]);
const selectedCategory = ref('all'); // Default to 'All'
const router = useRouter();

onMounted(async () => {
  try {
    const fetchedCategories = await getVideoCategories();
    // Filter out categories with title "Movies" or empty titles, if any
    categories.value = fetchedCategories.filter(cat => cat.snippet.title && cat.snippet.assignable);
  } catch (error) {
    // Handle error, maybe display a message
    console.error("Failed to load categories:", error);
  }
});

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId;
  // TODO: Implement actual filtering of videos on the homepage
  // For now, let's just log it or potentially navigate to a search for that category
  console.log('Selected category:', categoryId);
  // Example: If you wanted to search for videos in a category:
  // if (categoryId !== 'all') {
  //   router.push({ name: 'search', query: { q: categoryId } });
  // } else {
  //   router.push({ name: 'home' }); // Go back to popular videos
  // }
};
</script>

<style scoped>
/* No additional styles here, rely on base.css */
</style>