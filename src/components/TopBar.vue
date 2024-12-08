<template>
  <div class="w-full bg-white shadow-md sticky top-0 z-50">
    <div class="flex items-center justify-between px-6 py-3">
      <!-- Logo -->
      <div class="flex items-center space-x-8">
        <img
          src="@/assets/logo.png"
          alt="Logo"
          class="h-10 cursor-pointer"
          @click="navigateToLanding"
        />

        <!-- Navigation Buttons for Desktop -->
        <nav class="hidden md:flex space-x-6">
          <button
            class="text-gray-700 font-medium hover:text-blue-600 transition"
            @click="navigateToLanding"
          >
            Home
          </button>
          <button
            class="text-gray-700 font-medium hover:text-blue-600 transition"
            @click="navigateToAnalysis"
          >
            New Analysis
          </button>
          <button
            class="text-gray-700 font-medium hover:text-blue-600 transition"
            @click="navigateToHistory"
          >
            History
          </button>
        </nav>
      </div>

      <!-- Profile Avatar for Desktop -->
      <div class="hidden md:flex items-center space-x-4">
        <span
          v-if="isLoggedIn"
          class="text-gray-700 font-medium"
        >
          Welcome, {{ nickname }}
        </span>
        <img
          src="@/assets/profile-avatar.png"
          alt="Profile"
          class="h-10 w-10 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform"
          @click="toggleDropdown"
        />
      </div>

      <!-- Hamburger Menu Button for Mobile -->
      <button
        class="md:hidden text-gray-700 focus:outline-none"
        @click="toggleMobileMenu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-white shadow-lg border-t"
    >
      <nav class="flex flex-col space-y-2 px-6 py-4">
        <button
          class="text-gray-700 font-medium hover:text-blue-600 transition text-left"
          @click="navigateToLanding"
        >
          Home
        </button>
        <button
          class="text-gray-700 font-medium hover:text-blue-600 transition text-left"
          @click="navigateToAnalysis"
        >
          New Analysis
        </button>
        <button
          class="text-gray-700 font-medium hover:text-blue-600 transition text-left"
          @click="navigateToHistory"
        >
          History
        </button>
        <button
          v-if="!isLoggedIn"
          class="text-blue-600 font-medium hover:text-blue-700 transition text-left"
          @click="logIn"
        >
          Log In
        </button>
        <button
          v-if="isLoggedIn"
          class="text-red-600 font-medium hover:text-red-700 transition text-left"
          @click="logOut"
        >
          Log Out
        </button>
      </nav>
    </div>

    <!-- Profile Dropdown -->
    <div
      v-if="isDropdownOpen"
      class="absolute right-6 mt-2 w-40 bg-white shadow-lg rounded-lg transition-opacity z-50"
      :class="{ 'opacity-100': isDropdownOpen, 'opacity-0 pointer-events-none': !isDropdownOpen }"
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
</template>

<script>
import { getToken, getNickname } from "@/utils/authUtils";

export default {
  name: "TopBar",
  data() {
    return {
      isDropdownOpen: false,
      isMobileMenuOpen: false,
      isLoggedIn: false,
      nickname: "",
    };
  },
  created() {
    const token = getToken();
    const storedNickname = getNickname();

    if (token && storedNickname) {
      this.isLoggedIn = true;
      this.nickname = storedNickname;
    } else {
      this.isLoggedIn = false;
      this.nickname = null;
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    logIn() {
      this.$router.push("/login");
    },
    signUp() {
      this.$router.push("/signup");
    },
    logOut() {
      this.isLoggedIn = false;
      this.nickname = "";
      localStorage.removeItem("authToken");
      localStorage.removeItem("nickname");
      this.$router.push("/login");
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

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  transition: background-color 0.2s ease-in-out;
}

.relative .absolute {
  top: 100%;
  z-index: 50;
}
</style>
