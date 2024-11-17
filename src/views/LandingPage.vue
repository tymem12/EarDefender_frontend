<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navbar -->
    <div class="w-full flex items-center px-6 py-3 bg-white shadow-md">
      <!-- Logo and Navigation -->
      <div class="flex items-center space-x-8">
        <!-- Logo -->
        <img src="@/assets/logo.png" alt="Logo" class="h-10" />
        <!-- Navigation Buttons -->
        <nav class="flex space-x-6">
          <button 
            @click="navigateToLanding" 
            class="text-gray-700 font-medium hover:text-blue-600">
            Home
          </button>
          <button 
            @click="navigateToAnalysis" 
            class="text-gray-700 font-medium hover:text-blue-600">
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
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col items-center mt-16">
      <!-- Central Image -->
      <img src="@/assets/logo.png" alt="Shield Logo" class="w-96 h-96" />
      <!-- Description -->
      <div class="mt-8 bg-white shadow-lg p-6 rounded-lg w-72 text-center">
        <p class="text-gray-700 text-lg font-semibold">Opis :D</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
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
