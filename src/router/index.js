// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SearchView from '@/views/SearchView.vue';
import VideoDetailView from '@/views/VideoDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      // Pass the 'q' query parameter as a prop to the SearchView component
      props: (route) => ({ query: route.query.q })
    },
    {
      path: '/watch/:id', // :id will capture the video ID from the URL
      name: 'video-detail',
      component: VideoDetailView,
      props: true, // This makes route.params.id available as a prop named 'id' in VideoDetailView
    },
  ],
});

export default router;