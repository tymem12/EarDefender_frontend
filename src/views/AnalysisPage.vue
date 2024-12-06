<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col">
    <!-- TopBar Component -->
    <TopBar />

    <!-- Content -->
    <div class="flex-grow flex items-center justify-center px-6">
      <form
        class="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl space-y-6"
        @submit.prevent="validateAndSubmit"
      >
        <!-- Header -->
        <h2 class="text-3xl font-extrabold text-gray-800 text-center">
          Start New Analysis
        </h2>

        <!-- Input Section -->
        <div class="flex items-center space-x-4 justify-center">
          <!-- Settings Icon -->
          <button
            type="button"
            class="text-gray-500 p-3 rounded-full hover:bg-gray-200 transition"
            @click="toggleSettings"
          >
            <img
              src="@/assets/settings-icon.png"
              alt="Settings"
              class="h-5 w-5"
            />
          </button>
          <!-- Starting Point Input -->
          <input
            id="startingPoint"
            v-model="startingPoint"
            type="url"
            placeholder="Enter starting point URL"
            required
            class="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <!-- Additional Options (Hidden by Default) -->
        <transition name="fade">
          <div v-if="showSettings" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(label, field) in settingsFields"
              :key="field"
              class="space-y-2"
            >
              <label
                :for="field"
                class="block text-sm font-semibold text-gray-700"
              >
                {{ label }}
              </label>
              <input
                :id="field"
                v-model.number="formValues[field]"
                :type="getInputType(field)"
                :min="limits[field]?.min"
                :max="limits[field]?.max"
                placeholder="Enter {{ label.toLowerCase() }}"
                required
                class="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
              />
            </div>
            <div class="space-y-2">
              <label
                for="model"
                class="block text-sm font-semibold text-gray-700"
              >
                Model
              </label>
              <select
                id="model"
                v-model="model"
                required
                class="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
              >
                <option
                  v-for="modelOption in models"
                  :key="modelOption"
                  :value="modelOption"
                >
                  {{ modelOption }}
                </option>
              </select>
            </div>
          </div>
        </transition>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Start Analysis
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import axios from "@/axios";
import analysisConfig from "@/config/analysisConfig";
import { getToken } from "@/utils/authUtils";

export default {
  name: "AnalysisPage",
  components: {
    TopBar,
  },
  data() {
    return {
      startingPoint: "",
      depth: analysisConfig.defaults.depth,
      maxFiles: analysisConfig.defaults.maxFiles,
      model: analysisConfig.defaults.model,
      maxPages: analysisConfig.defaults.maxPages,
      maxTimePerFile: analysisConfig.defaults.maxTimePerFile,
      maxTotalTime: analysisConfig.defaults.maxTotalTime,
      showSettings: false,
      limits: analysisConfig.limits,
      models: analysisConfig.models,
      settingsFields: {
        depth: "Depth",
        maxFiles: "Max Files",
        maxPages: "Max Pages",
        maxTimePerFile: "Max Time Per File (seconds)",
        maxTotalTime: "Max Total Time (seconds)",
      },
      formValues: {
        depth: analysisConfig.defaults.depth,
        maxFiles: analysisConfig.defaults.maxFiles,
        maxPages: analysisConfig.defaults.maxPages,
        maxTimePerFile: analysisConfig.defaults.maxTimePerFile,
        maxTotalTime: analysisConfig.defaults.maxTotalTime,
      },
    };
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    getInputType(field) {
      return field === "startingPoint" ? "url" : "number";
    },
    validateAndSubmit() {
      for (const [field, value] of Object.entries(this.formValues)) {
        const limit = this.limits[field];
        if (value < limit.min || value > limit.max) {
          alert(`Invalid value for ${field}. Please check the limits.`);
          return;
        }
      }

      this.startAnalysis();
    },
    async startAnalysis() {
      try {
        const token = getToken();
        if (!token) {
          alert("No authentication token found. Please log in.");
          this.$router.push("/login");
          return;
        }

        const response = await axios.post(
          "/analyses/begin",
          {
            startingPoint: this.startingPoint,
            ...this.formValues,
            model: this.model,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response:", response.data);
        this.$router.push("/history");
      } catch (error) {
        console.error("Error starting analysis:", error.response?.data || error.message);
        alert("Failed to start analysis: " + (error.response?.data?.message || error.message));
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
