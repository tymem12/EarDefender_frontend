<template>
  <div class="w-full flex items-center px-6 py-3 bg-white shadow-md">
    <!-- Logo and Navigation -->
    <div class="flex items-center space-x-8">
      <!-- Logo -->
      <img
        src="@/assets/logo.png"
        alt="Logo"
        class="h-10 cursor-pointer"
        @click="navigateToLanding"
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
        <button 
          class="text-gray-700 font-medium hover:text-blue-600"
          @click="navigateToHistory"
        >
          History
        </button>
      </nav>
    </div>
  
    <!-- Profile Avatar with Dropdown -->
    <div class="ml-auto relative">
      <img
        src="@/assets/profile-avatar.png"
        alt="Profile"
        class="h-10 w-10 rounded-full border border-gray-200 shadow-sm cursor-pointer"
        @click="toggleDropdown"
      >
      <!-- Dropdown Menu -->
      <div 
        v-if="isDropdownOpen" 
        class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg"
      >
        <ul>
          <li
            v-if="!isLoggedIn" 
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="logIn"
          >
            Log In
          </li>
          <li
            v-if="!isLoggedIn" 
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="signUp"
          >
            Sign Up
          </li>
          <li
            v-if="isLoggedIn" 
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            @click="logOut"
          >
            Log Out
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "TopBar",
    data() {
      return {
        isDropdownOpen: false,
        isLoggedIn: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      logIn() {
        this.$router.push("/login");
      },
      signUp() {
        this.$router.push("/signup");
      },
      logOut() {
        this.isLoggedIn = false;
        alert("You have logged out.");
      },
      navigateToLanding() {
        this.$router.push("/");
      },
      navigateToAnalysis() {
        this.$router.push("/analysis");
      },
      navigateToHistory() {
        this.$router.push("/history");
      },
    },
  };
  </script>
  
  <style>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    transition: background-color 0.2s ease-in-out;
  }
  </style>
  