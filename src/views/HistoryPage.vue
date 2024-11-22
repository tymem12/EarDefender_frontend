<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Reusable TopBar Component -->
    <TopBar />
  
    <!-- Main Content -->
    <div class="flex flex-col items-center mt-16">
      <h1 class="text-3xl font-semibold text-gray-800">
        History Page
      </h1>
      
      <div class="w-full max-w-4xl mt-8">
        <div
          v-if="loading"
          class="text-center text-gray-600"
        >
          Loading...
        </div>
        <div
          v-else-if="error"
          class="text-center text-red-600"
        >
          Error: {{ error }}
        </div>
        <div v-else>
          <div
            v-for="analysis in analyses"
            :key="analysis.id"
            class="mb-4"
          >
            <AnalysisItem
              :analysis="analysis"
              @view-details="redirectToDetails"
            />
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
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.get("/analyses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.analyses = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    redirectToDetails(analysisId) {
      this.$router.push(`/analysis/${analysisId}`);
    },
  },
};
</script>
