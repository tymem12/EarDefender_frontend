<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Reusable TopBar Component -->
    <TopBar />
  
    <!-- Main Content -->
    <div class="flex flex-col items-center mt-16">
      <h1 class="text-3xl font-semibold text-gray-800">
        History Page
      </h1>
    </div>
  </div>
</template>
  
  <script>
  import TopBar from "@/components/TopBar.vue";
  
  export default {
    name: "HistoryPage",
    components: {
      TopBar,
    },
  };
  </script>
  