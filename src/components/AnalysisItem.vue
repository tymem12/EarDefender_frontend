<template>
  <div
    class="bg-white shadow-md p-6 rounded-lg transition-transform hover:scale-105 hover:shadow-lg"
  >
    <!-- First Row: ID, Status, and Timestamp -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
      <!-- Left Section: ID and Status -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <p class="text-lg font-bold text-gray-800 break-words">
          {{ analysis.id }}
        </p>
        <span
          :class="statusClass"
          class="px-3 py-1 text-xs font-semibold rounded-lg"
        >
          {{ analysis.status }}
        </span>
      </div>

      <!-- Right Section: Timestamp -->
      <p class="text-sm text-gray-500 text-center sm:text-right">
        {{ formattedTimestamp }}
      </p>
    </div>

    <!-- Second Row: File Counts and Button -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <!-- File Counts -->
      <div class="flex flex-col sm:flex-row sm:space-x-8">
        <p class="text-sm text-gray-600">
          <span class="font-semibold">File Count:</span>
          {{ analysis.fileCount ?? "N/A" }}
        </p>
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Deepfake File Count:</span>
          {{ analysis.deepfakeFileCount ?? "N/A" }}
        </p>
      </div>

      <!-- Details Button -->
      <div class="flex justify-end sm:justify-start">
        <button
          class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
          @click="$emit('view-details', analysis.id)"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnalysisItem",
  props: {
    analysis: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusClass() {
      switch (this.analysis.status) {
        case "INITIALIZED":
          return "bg-gray-100 text-gray-700";
        case "SCRAPING":
          return "bg-yellow-100 text-yellow-700";
        case "PROCESSING":
          return "bg-blue-100 text-blue-700";
        case "FINISHED":
          return "bg-green-100 text-green-700";
        default:
          return "bg-red-100 text-red-700";
      }
    },
    formattedTimestamp() {
      return this.analysis.timestamp
        ? new Date(this.analysis.timestamp).toLocaleString()
        : "N/A";
    },
  },
};
</script>

<style scoped>
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
}
</style>
