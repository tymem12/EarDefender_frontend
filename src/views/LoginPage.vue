<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col">
    <!-- TopBar Component -->
    <TopBar />

    <!-- Login Form -->
    <div class="flex items-center justify-center flex-grow">
      <div class="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back
        </h2>
        <p class="text-gray-600 text-center mt-2">
          Please log in to continue to your account.
        </p>
        <form
          class="mt-6 space-y-6"
          @submit.prevent="handleLogin"
        >
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Log In
          </button>
        </form>
        <p class="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?
          <a
            class="text-blue-600 font-semibold hover:underline cursor-pointer"
            @click="navigateToSignup"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import TopBar from "@/components/TopBar.vue";
import { setToken, setNickname } from "@/utils/authUtils";

export default {
  name: "LoginPage",
  components: {
    TopBar,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const authResponse = await axios.post("/auth/login", {
          email: this.email,
          password: this.password,
        });
        const token = authResponse.data.token;

        const infoResponse = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const nickname = infoResponse.data.fullName;

        setToken(token);
        setNickname(nickname);

        this.$router.push("/analysis");
      } catch (error) {
        alert("Login failed: " + (error.response?.data?.message || error.message));
      }
    },
    navigateToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped>
input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>
