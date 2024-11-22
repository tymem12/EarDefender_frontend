import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import AnalysisPage from '@/views/AnalysisPage.vue';
import LoginPage from "@/views/LoginPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import HistoryPage from "@/views/HistoryPage.vue";
import AnalysisDetails from "@/views/AnalysisDetails.vue";

const routes = [
  { path: '/', component: LandingPage },
  { path: '/analysis', component: AnalysisPage },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/history", component: HistoryPage },
  { path: "/analysis/:id", component: AnalysisDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
