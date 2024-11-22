import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import AnalysisPage from '@/views/AnalysisPage.vue';
import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import HistoryPage from "@/views/HistoryPage.vue";
import AnalysisDetails from "@/views/AnalysisDetails.vue";

const routes = [
  { path: '/', component: LandingPage },
  { 
    path: '/analysis', 
    component: AnalysisPage,
    meta: { requiresAuth: true },
  },
  { 
    path: '/history', 
    component: HistoryPage,
    meta: { requiresAuth: true },
  },
  { 
    path: '/analysis/:id', 
    component: AnalysisDetails,
    meta: { requiresAuth: true },
  },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('authToken');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
