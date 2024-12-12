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
        <form class="mt-6 space-y-6" @submit.prevent="handleSignup">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
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
            <label for="email" class="block text-sm font-medium text-gray-700">
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
            <label for="password" class="block text-sm font-medium text-gray-700">
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
            <div class="mt-4 p-4 bg-gray-50 border rounded-lg">
              <p class="text-sm font-medium text-gray-700">Password must include:</p>
              <div class="mt-2 space-y-2">
                <div
                  v-for="(requirement, index) in passwordRequirements"
                  :key="index"
                  class="requirement-item"
                >
                  <span
                    class="inline-block w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    :class="{
                      'border-green-500': requirement.fulfilled,
                      'border-gray-300': !requirement.fulfilled,
                      'bg-green-500': requirement.fulfilled,
                    }"
                  >
                    <svg
                      v-if="requirement.fulfilled"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span class="requirement-text text-sm" :class="{ 'text-green-600': requirement.fulfilled }">
                    {{ requirement.label }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            :disabled="!canSignup"
            class="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            :class="{ 'opacity-50 cursor-not-allowed': !canSignup }"
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
  computed: {
    passwordCriteria() {
      return {
        length: this.password.length >= 8 && this.password.length <= 60,
        upperCase: /[A-Z]/.test(this.password),
        lowerCase: /[a-z]/.test(this.password),
        digit: /[0-9]/.test(this.password),
        specialChar: /[!@#$%^&*_+\-=?]/.test(this.password),
      };
    },
    passwordRequirements() {
      return [
        { label: "8-60 characters", fulfilled: this.passwordCriteria.length },
        { label: "At least one uppercase letter", fulfilled: this.passwordCriteria.upperCase },
        { label: "At least one lowercase letter", fulfilled: this.passwordCriteria.lowerCase },
        { label: "At least one digit", fulfilled: this.passwordCriteria.digit },
        { label: "At least one special character (!@#$%^&*_+-=?)", fulfilled: this.passwordCriteria.specialChar },
      ];
    },
    canSignup() {
      return (
        this.name &&
        this.email &&
        Object.values(this.passwordCriteria).every((criterion) => criterion)
      );
    },
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

button:disabled {
  cursor: not-allowed;
}

.requirement-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.requirement-text {
  word-break: break-word;
  margin-left: 0.75rem;
  line-height: 1.4;
  font-size: 0.875rem;
}

.requirement-item:last-child {
  margin-bottom: 0;
}
</style>

