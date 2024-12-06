<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col">
    <!-- Reusable TopBar Component -->
    <TopBar />

    <!-- Main Content -->
    <div class="flex flex-col items-center mt-16 px-4">
      <h1 class="text-4xl font-extrabold text-gray-800">
        Analysis Details
      </h1>
      <div class="w-full max-w-4xl mt-8">
        <!-- Loading and Error States -->
        <div v-if="loading" class="text-center text-gray-600 p-6">
          <span class="animate-pulse">Loading...</span>
        </div>
        <div v-else-if="error" class="text-center text-red-600 bg-red-100 p-4 rounded-lg">
          Error: {{ error }}
        </div>
        <div v-else>
          <!-- General Analysis Information -->
          <div class="bg-white shadow-md p-6 rounded-lg mb-6">
            <!-- Analysis ID, Status Label, and Timestamp -->
            <div class="flex justify-between items-center pb-4 mb-4 border-b border-gray-300">
              <div class="flex items-center space-x-4">
                <h2 class="text-xl font-bold text-gray-800">
                  {{ analysis.id }}
                </h2>
                <span
                  :class="`px-3 py-1 rounded-full font-semibold text-sm ${statusClass}`"
                >
                  {{ analysis.status }}
                </span>
              </div>
              <p class="text-sm text-gray-500">
                {{ new Date(analysis.timestamp).toLocaleString() }}
              </p>
            </div>

            <!-- File Counts Section -->
            <div class="grid grid-cols-2 gap-x-8 text-sm text-gray-600 pb-4 mb-4 border-b border-gray-300">
              <div>
                <p>
                  <span class="font-semibold">File Count:</span>
                  {{ analysis.fileCount ?? "N/A" }}
                </p>
              </div>
              <div>
                <p>
                  <span class="font-semibold">Deepfake File Count:</span>
                  {{ analysis.deepfakeFileCount ?? 0 }}
                </p>
              </div>
            </div>

            <!-- Input Parameters Section -->
            <div class="grid grid-cols-2 gap-x-8 text-sm text-gray-600">
              <!-- Left Column -->
              <div>
                <p>
                  <span class="font-semibold">Starting Point:</span>
                  <a
                    :href="analysis.inputParams.startingPoint"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:underline"
                  >
                    {{ analysis.inputParams.startingPoint }}
                  </a>
                </p>
                <p>
                  <span class="font-semibold">Max Depth:</span>
                  {{ analysis.inputParams.maxDepth }}
                </p>
                <p>
                  <span class="font-semibold">Max Files:</span>
                  {{ analysis.inputParams.maxFiles }}
                </p>
                <p>
                  <span class="font-semibold">Model:</span>
                  {{ analysis.inputParams.model }}
                </p>
              </div>

              <!-- Right Column -->
              <div>
                <p>
                  <span class="font-semibold">Max Pages:</span>
                  {{ analysis.inputParams.maxPages }}
                </p>
                <p>
                  <span class="font-semibold">Max Time Per File:</span>
                  {{ analysis.inputParams.maxTimePerFile }}
                </p>
                <p>
                  <span class="font-semibold">Max Total Time:</span>
                  {{ analysis.inputParams.maxTotalTime }}
                </p>
              </div>
            </div>
          </div>

          <!-- Prediction Results -->
          <div class="space-y-4">
            <PredictionResult
              v-for="result in analysis.predictionResults"
              :key="result.link"
              :result="result"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import PredictionResult from "@/components/PredictionResult.vue";
import axios from "@/axios";
import { getToken } from "@/utils/authUtils";

export default {
  name: "AnalysisDetails",
  components: {
    TopBar,
    PredictionResult,
  },
  data() {
    return {
      analysis: null,
      loading: true,
      error: null,
      intervalId: null,
    };
  },
  computed: {
    statusClass() {
      if (!this.analysis) return "";
      switch (this.analysis.status) {
        case "INITIALIZED":
          return "bg-gray-200 text-gray-800";
        case "SCRAPING":
          return "bg-yellow-200 text-yellow-800";
        case "PROCESSING":
          return "bg-blue-200 text-blue-800";
        case "FINISHED":
          return "bg-green-200 text-green-800";
        default:
          return "bg-red-200 text-red-800";
      }
    },
  },
  async created() {
    await this.fetchAnalysisDetails();
    this.startAutoRefresh();
  },
  beforeUnmount() {
    this.stopAutoRefresh();
  },
  methods: {
    async fetchAnalysisDetails() {
      try {
        this.loading = true;
        this.error = null;

        const token = getToken();
        if (!token) throw new Error("Authentication token not found");

        const analysisId = this.$route.params.id;
        const response = await axios.get(`/analyses/${analysisId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.analysis = response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    startAutoRefresh() {
      this.intervalId = setInterval(this.fetchAnalysisDetails, 60000);
    },
    stopAutoRefresh() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
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
