<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
    <div class="w-full flex items-center px-6 py-3 bg-white shadow-md">
      <!-- Logo and Navigation -->
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
    <div class="mt-8 w-full max-w-4xl px-4">
      <!-- Input Section -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <!-- Settings Icon -->
          <div class="bg-purple-500 text-white p-2 rounded-full">
            <img
              src="@/assets/settings-icon.png"
              alt="Settings"
              class="h-5 w-5"
            >
          </div>
          <!-- Input Field -->
          <input
            type="text"
            placeholder="Hinted search text"
            class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
          >
        </div>
        <!-- Start Button -->
        <button class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Start
        </button>
      </div>
  
      <!-- Max Depth Section -->
      <div class="mt-8">
        <div class="bg-white shadow-lg rounded-lg p-6">
          <p class="text-gray-600 font-semibold">
            Max Depth: <span class="text-black">10</span>
          </p>
          <p class="mt-4 text-gray-400">
            ...
          </p>
          <p class="text-gray-400">
            ...
          </p>
          <p class="text-gray-400">
            ...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "AnalysisPage",
    methods: {
      navigateToLanding() {
        this.$router.push('/'); // Redirect to the landing page
      },
      navigateToAnalysis() {
        this.$router.push('/analysis'); // Redirect to the analysis page
      },
    },
  };
  </script>
  
  <style>
  /* Optional global styles for hover effects */
  button {
    transition: color 0.2s ease-in-out;
  }
  </style>
  