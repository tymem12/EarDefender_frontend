<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Reusable TopBar Component -->
    <TopBar />

    <!-- Main Content -->
    <div class="flex flex-col items-center mt-16 px-4">
      <h1 class="text-4xl font-extrabold text-gray-800">
        Analysis History
      </h1>

      <!-- History List -->
      <div class="w-full max-w-4xl mt-8">
        <div
          v-if="error"
          class="text-center text-red-600 bg-red-100 p-4 rounded-lg"
        >
          Error: {{ error }}
        </div>
        <div
          v-else-if="loading"
          class="text-center text-gray-600 p-4 rounded-lg"
        >
          <span class="animate-pulse">Loading...</span>
        </div>
        <div v-else class="space-y-4">
          <AnalysisItem
            v-for="analysis in analyses"
            :key="analysis.id"
            :analysis="analysis"
            @view-details="redirectToDetails"
          />
          <div
            v-if="!analyses.length"
            class="text-center text-gray-500 bg-gray-100 p-4 rounded-lg"
          >
            No analyses found. Start a new analysis to see results here.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import AnalysisItem from "@/components/AnalysisItem.vue";
import axios from "@/axios";
import { getToken } from "@/utils/authUtils";

export default {
  name: "HistoryPage",
  components: {
    TopBar,
    AnalysisItem,
  },
  data() {
    return {
      analyses: [],
      loading: true,
      error: null,
      intervalId: null,
    };
  },
  async created() {
    await this.fetchAnalyses();
    this.startAutoRefresh();
  },
  beforeUnmount() {
    this.stopAutoRefresh();
  },
  methods: {
    async fetchAnalyses() {
      this.loading = true;
      this.error = null;
      try {
        const token = getToken();
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.get("/analyses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort analyses by timestamp in descending order
        this.analyses = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      } catch (err) {
        this.error = err.message || "Failed to fetch analyses";
      } finally {
        this.loading = false;
      }
    },
    startAutoRefresh() {
      this.intervalId = setInterval(this.fetchAnalyses, 60000);
    },
    stopAutoRefresh() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    redirectToDetails(analysisId) {
      this.$router.push(`/analysis/${analysisId}`);
    },
  },
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>
