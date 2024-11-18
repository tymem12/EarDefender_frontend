<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
    <div class="w-full flex items-center px-6 py-3 bg-white shadow-md">
      <div class="flex items-center space-x-8">
        <!-- Logo -->
        <img
          src="@/assets/logo.png"
          alt="Logo"
          class="h-10"
        >
        <!-- Navigation Buttons -->
        <nav class="flex space-x-6">
          <button 
            class="text-gray-700 font-medium hover:text-blue-600" 
            @click="navigateToLanding"
          >
            Home
          </button>
          <button 
            class="text-gray-700 font-medium hover:text-blue-600" 
            @click="navigateToAnalysis"
          >
            New Analysis
          </button>
          <button class="text-gray-700 font-medium hover:text-blue-600">
            History
          </button>
        </nav>
      </div>
      <!-- Profile Avatar -->
      <div class="ml-auto">
        <img
          src="@/assets/profile-avatar.png"
          alt="Profile"
          class="h-10 w-10 rounded-full border border-gray-200 shadow-sm"
        >
      </div>
    </div>

    <!-- Content -->
    <div class="flex-grow flex items-center justify-center">
      <form
        class="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl"
        @submit.prevent="validateAndSubmit"
      >
        <!-- Input Section -->
        <div class="flex items-center mb-6 space-x-4 justify-center">
          <!-- Settings Icon -->
          <div
            class="bg-purple-500 text-white p-2 rounded-full cursor-pointer"
            @click="toggleSettings"
          >
            <img
              src="@/assets/settings-icon.png"
              alt="Settings"
              class="h-5 w-5"
            >
          </div>
          <!-- Starting Point Input -->
          <input
            id="startingPoint"
            v-model="startingPoint"
            type="url"
            placeholder="Enter starting point URL"
            required
            class="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
        </div>

        <!-- Additional Options (Hidden by Default) -->
        <div
          v-if="showSettings"
          class="grid grid-cols-2 gap-4"
        >
          <div>
            <label
              for="depth"
              class="block text-sm font-medium text-gray-700"
            >
              Depth ({{ limits.depth.min }}-{{ limits.depth.max }})
            </label>
            <input
              id="depth"
              v-model.number="depth"
              type="number"
              :min="limits.depth.min"
              :max="limits.depth.max"
              placeholder="Enter depth"
              required
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            >
          </div>
          <div>
            <label
              for="maxFiles"
              class="block text-sm font-medium text-gray-700"
            >
              Max Files ({{ limits.maxFiles.min }}-{{ limits.maxFiles.max }})
            </label>
            <input
              id="maxFiles"
              v-model.number="maxFiles"
              type="number"
              :min="limits.maxFiles.min"
              :max="limits.maxFiles.max"
              placeholder="Enter max files"
              required
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            >
          </div>
          <div>
            <label
              for="model"
              class="block text-sm font-medium text-gray-700"
            >Model</label>
            <select
              id="model"
              v-model="model"
              required
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
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
          <div>
            <label
              for="maxPages"
              class="block text-sm font-medium text-gray-700"
            >
              Max Pages ({{ limits.maxPages.min }}-{{ limits.maxPages.max }})
            </label>
            <input
              id="maxPages"
              v-model.number="maxPages"
              type="number"
              :min="limits.maxPages.min"
              :max="limits.maxPages.max"
              placeholder="Enter max pages"
              required
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            >
          </div>
          <div>
            <label
              for="maxTimePerFile"
              class="block text-sm font-medium text-gray-700"
            >
              Max Time Per File ({{ limits.maxTimePerFile.min }}-{{ limits.maxTimePerFile.max }}s)
            </label>
            <input
              id="maxTimePerFile"
              v-model.number="maxTimePerFile"
              type="number"
              :min="limits.maxTimePerFile.min"
              :max="limits.maxTimePerFile.max"
              placeholder="Enter max time per file"
              required
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            >
          </div>
          <div>
            <label
              for="maxTotalTime"
              class="block text-sm font-medium text-gray-700"
            >
              Max Total Time ({{ limits.maxTotalTime.min }}-{{ limits.maxTotalTime.max }}s)
            </label>
            <input
              id="maxTotalTime"
              v-model.number="maxTotalTime"
              type="number"
              :min="limits.maxTotalTime.min"
              :max="limits.maxTotalTime.max"
              placeholder="Enter max total time"
              required
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            >
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="mt-6 w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Start Analysis
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import analysisConfig from "@/config/analysisConfig";

export default {
  name: "AnalysisPage",
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
    };
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    validateAndSubmit() {
      if (
        this.depth < this.limits.depth.min ||
        this.depth > this.limits.depth.max ||
        this.maxFiles < this.limits.maxFiles.min ||
        this.maxFiles > this.limits.maxFiles.max ||
        this.maxPages < this.limits.maxPages.min ||
        this.maxPages > this.limits.maxPages.max ||
        this.maxTimePerFile < this.limits.maxTimePerFile.min ||
        this.maxTimePerFile > this.limits.maxTimePerFile.max ||
        this.maxTotalTime < this.limits.maxTotalTime.min ||
        this.maxTotalTime > this.limits.maxTotalTime.max
      ) {
        alert("One or more inputs are out of the allowed limits. Please check.");
        return;
      }

      this.startAnalysis();
    },
    async startAnalysis() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("No authentication token found. Please log in.");
          this.$router.push("/login");
          return;
        }

        const response = await axios.post(
          "/analyses/begin",
          {
            startingPoint: this.startingPoint,
            depth: this.depth,
            maxFiles: this.maxFiles,
            model: this.model,
            maxPages: this.maxPages,
            maxTimePerFile: this.maxTimePerFile,
            maxTotalTime: this.maxTotalTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Analysis started successfully");
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error starting analysis:", error.response?.data || error.message);
        alert("Failed to start analysis: " + (error.response?.data?.message || error.message));
      }
    },
  },
};
</script>
