<template>
  <div class="flex flex-col min-h-screen bg-gray-100 text-gray-900">
    <AppHeader />
    <div class="flex flex-1 pt-0">
      <AppSidebar />
      <div class="flex-1 p-4 md:p-6 lg:p-8 flex flex-col overflow-auto">
        <AppCategoryBar />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppCategoryBar from '@/components/layout/AppCategoryBar.vue';
import { RouterView } from 'vue-router';
</script>