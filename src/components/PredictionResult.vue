<template>
  <div
    class="bg-white shadow-md p-6 rounded-lg mb-8 max-w-5xl mx-auto"
    style="width: 90%"
  >
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b pb-4 mb-4 space-y-4 sm:space-y-0">
      <!-- Left Column: Details -->
      <div class="text-left">
        <div class="flex items-center">
          <h3 class="text-xl font-bold text-gray-800">
            File Evaluation
          </h3>
          <span
            :class="result.label === 1 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
            class="ml-4 px-2 py-1 rounded-md font-semibold text-sm"
          >
            {{ result.label === 1 ? "Deepfake" : "Real" }}
          </span>
        </div>
        <p class="text-sm text-gray-600 mt-1">
          <span class="font-semibold">Link:</span>
          <a
            :href="result.link"
            target="_blank"
            class="text-blue-500 hover:underline break-all whitespace-normal"
          >
            {{ result.link }}
          </a>
        </p>
        <p class="text-sm text-gray-600 mt-1">
          <span class="font-semibold">Score:</span> {{ roundedScore }}
        </p>
      </div>
      <!-- Right Column: Timestamp -->
      <div class="text-center sm:text-right">
        <p class="text-sm text-gray-600 font-medium">
          {{ timestamp }}
        </p>
      </div>
    </div>

    <!-- Segment Predictions Header -->
    <div class="flex justify-between items-center">
      <h4 class="text-lg font-semibold text-gray-800">
        Segment Predictions
      </h4>
      <button
        class="text-blue-500 hover:text-blue-600 focus:outline-none transition"
        @click="toggleTable"
      >
        <span v-if="showTable">▼ Show Less</span>
        <span v-else>▶ Show Details</span>
      </button>
    </div>

    <!-- Bar Chart -->
    <div class="chart-container mt-4">
      <BarChart
        :data="chartData"
        :options="chartOptions"
      />
    </div>

    <!-- Segment Details Table -->
    <transition name="fade">
      <div
        v-if="showTable"
        class="mt-6 overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-inner"
      >
        <table class="table-auto w-full text-left border-collapse border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 border border-gray-300 text-gray-800 font-semibold">
                Segment
              </th>
              <th class="px-4 py-2 border border-gray-300 text-gray-800 font-semibold">
                Start
              </th>
              <th class="px-4 py-2 border border-gray-300 text-gray-800 font-semibold">
                End
              </th>
              <th class="px-4 py-2 border border-gray-300 text-gray-800 font-semibold">
                Label
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="segment in result.modelPredictions"
              :key="segment.segmentNumber"
              class="hover:bg-gray-100"
            >
              <td class="px-4 py-2 border border-gray-300 text-gray-600">
                {{ segment.segmentNumber }}
              </td>
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
    </transition>
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
      showTable: false,
      tickSpacing: 5,
    };
  },
  computed: {
    roundedScore() {
      return parseFloat(this.result.score).toFixed(2);
    },
    timestamp() {
      return new Date(this.result.timestamp).toLocaleString();
    },
    chartData() {
      return {
        labels: this.result.modelPredictions.map((segment) =>
          this.formatShortTime(segment.segmentNumber * 4)
        ),
        datasets: [
          {
            label: "Segment Predictions",
            data: this.result.modelPredictions.map((segment) => segment.label),
            backgroundColor: this.result.modelPredictions.map((segment) =>
              segment.label === 1 ? "#f56565" : "#48bb78"
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
              callback: (value, index) => {
                return index % this.tickSpacing === 0
                  ? this.formatShortTime(index * 4)
                  : null;
              },
              font: {
                size: 10,
              },
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
      this.showTable = !this.showTable;
    },
    formatTime(seconds) {
      const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      return `${hours}:${minutes}:${secs}`;
    },
    formatShortTime(seconds) {
      const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      return `${minutes}:${secs}`;
    },
  },
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 40px;
}

table {
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
a {
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
}

</style>
