<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Reusable TopBar Component -->
    <TopBar />

    <!-- Main Content -->
    <div class="flex flex-col items-center mt-16">
      <!-- Central Image -->
      <img
        src="@/assets/logo.png"
        alt="Shield Logo"
        class="w-96 h-96"
      >
      <!-- Description -->
      <div class="mt-8 bg-white shadow-lg p-6 rounded-lg w-72 text-center">
        <p class="text-gray-700 text-lg font-semibold">
          Opis :D
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";

export default {
  name: "LandingPage",
  components: {
    TopBar, // Import TopBar component
  },
};
</script>
