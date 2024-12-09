<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col">
    <!-- TopBar Component -->
    <TopBar />

    <!-- Sign Up Form -->
    <div class="flex items-center justify-center flex-grow">
      <div class="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-3xl font-extrabold text-center text-gray-800">
          Create an Account
        </h2>
        <p class="text-gray-600 text-center mt-2">
          Join us to access all features and manage your analyses effectively.
        </p>
        <form
          class="mt-6 space-y-6"
          @submit.prevent="handleSignup"
        >
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full mt-2 px-4 py-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your full name"
              required
            >
          </div>
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
            >
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
              placeholder="Create a password"
              required
            >
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Sign Up
          </button>
        </form>
        <p class="text-sm text-center mt-6 text-gray-600">
          Already have an account?
          <a
            class="text-blue-600 font-semibold hover:underline cursor-pointer"
            @click="navigateToLogin"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "SignupPage",
  components: {
    TopBar,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await axios.post("/auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        console.log("Signup response:", response.data);
        this.$router.push("/login");
      } catch (error) {
        alert("Signup failed: " + (error.response?.data?.message || error.message));
      }
    },
    navigateToLogin() {
      this.$router.push("/login");
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
