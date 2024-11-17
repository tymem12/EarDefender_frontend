import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import AnalysisPage from '@/views/AnalysisPage.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/analysis', component: AnalysisPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
