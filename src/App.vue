<template>
  <div class="app-container">
    <AppHeader />
    <div class="main-content">
      <AppSidebar />
      <div class="view-container">
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

<style>
/* No additional styles here, base.css handles everything */
</style>