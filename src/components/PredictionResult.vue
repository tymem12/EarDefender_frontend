<template>
  <div class="bg-white shadow-lg p-6 rounded-lg mb-6">
    <!-- Header -->
    <div class="flex justify-between items-start border-b pb-4 mb-4">
      <!-- Left Column: Details -->
      <div class="text-left">
        <div class="flex items-center">
          <h3 class="text-xl font-bold text-gray-800 mb-2">File Evaluation</h3>
          <span
            :class="result.label === 1 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
            class="ml-4 px-2 py-1 rounded-md font-semibold text-sm"
          >
            {{ result.label === 1 ? "Deepfake" : "Real" }}
          </span>
        </div>
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Link:</span>
          <a :href="result.link" target="_blank" class="text-blue-500 hover:underline">
            {{ result.link }}
          </a>
        </p>
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Score:</span> {{ roundedScore }}
        </p>
      </div>
      <!-- Right Column: Timestamp -->
      <div class="text-right">
        <p class="text-sm text-gray-600 font-semibold">{{ timestamp }}</p>
      </div>
    </div>

    <!-- Segment Predictions Header -->
    <div class="flex justify-between items-center">
      <h4 class="text-lg font-semibold text-gray-800">Segment Predictions:</h4>
      <button
        @click="toggleTable"
        class="text-blue-500 hover:text-blue-600 focus:outline-none"
      >
        <span v-if="showTable">▼ Show Less</span>
        <span v-else>▶ Show Details</span>
      </button>
    </div>

    <!-- Bar Chart -->
    <div class="chart-container mt-4">
      <BarChart :data="chartData" :options="chartOptions" />
    </div>

    <!-- Segment Details Table -->
    <div v-if="showTable" class="mt-6 overflow-x-auto bg-gray-50 p-4 rounded shadow-inner">
      <table class="table-auto w-full text-left border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 border border-gray-300 text-gray-800 font-semibold">Segment</th>
            <th class="px-4 py-2 border border-gray-300 text-gray-800 font-semibold">Start</th>
            <th class="px-4 py-2 border border-gray-300 text-gray-800 font-semibold">End</th>
            <th class="px-4 py-2 border border-gray-300 text-gray-800 font-semibold">Label</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="segment in result.modelPredictions"
            :key="segment.segmentNumber"
            class="hover:bg-gray-100"
          >
            <td class="px-4 py-2 border border-gray-300 text-gray-600">{{ segment.segmentNumber }}</td>
            <td class="px-4 py-2 border border-gray-300 text-gray-600">
              {{ formatTime(segment.segmentNumber * 4) }}
            </td>
            <td class="px-4 py-2 border border-gray-300 text-gray-600">
              {{ formatTime(segment.segmentNumber * 4 + 3) }}
            </td>
            <td class="px-4 py-2 border border-gray-300 text-gray-600">
              <span
                :class="segment.label === 1 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
                class="px-2 py-1 rounded-md font-semibold"
              >
                {{ segment.label === 1 ? "Deepfake" : "Real" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  name: "PredictionResult",
  components: {
    BarChart: Bar,
  },
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showTable: false, // Toggles the table visibility
    };
  },
  computed: {
    roundedScore() {
      return parseFloat(this.result.score).toFixed(2); // Round to 2 decimal places
    },
    timestamp() {
      // Replace with actual timestamp data if available in the result object
      return new Date().toLocaleString(); // Placeholder timestamp
    },
    chartData() {
      return {
        labels: this.result.modelPredictions.map(
          (segment) => `Segment ${segment.segmentNumber}`
        ),
        datasets: [
          {
            label: "Segment Predictions",
            data: this.result.modelPredictions.map((segment) => segment.label),
            backgroundColor: this.result.modelPredictions.map((segment) =>
              segment.label === 1 ? "#f56565" : "#48bb78" // Red for 1, Green for 0
            ),
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const segmentNumber = context.dataIndex;
                const label = context.raw === 1 ? "Deepfake" : "Real";
                const startTime = this.formatTime(segmentNumber * 4);
                const endTime = this.formatTime(segmentNumber * 4 + 3);

                return `Prediction: ${label}\nFragment:\n${startTime} - ${endTime}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y: {
            display: false,
          },
        },
      };
    },
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable; // Toggles table visibility
    },
    formatTime(seconds) {
      const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      return `${hours}:${minutes}:${secs}`;
    },
  },
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 60px; /* Slightly larger height for better visibility */
  margin-top: 10px;
}
table {
  font-size: 14px;
}
</style>
