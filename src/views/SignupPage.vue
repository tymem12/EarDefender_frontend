<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center text-gray-800">
        Sign Up
      </h2>
      <form
        class="mt-6 space-y-4"
        @submit.prevent="handleSignup"
      >
        <!-- Name Field -->
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700"
          >Full Name</label>
          <input 
            id="name" 
            v-model="name" 
            type="text" 
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
            required
          >
        </div>
        <!-- Email Field -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700"
          >Email</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          >
        </div>
        <!-- Password Field -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700"
          >Password</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Create a password"
            required
          >
        </div>
        <!-- Submit Button -->
        <button 
          type="submit" 
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p class="text-sm text-center mt-4 text-gray-600">
        Already have an account? 
        <a 
          class="text-blue-600 hover:underline cursor-pointer" 
          @click="navigateToLogin"
        >
          Log In
        </a>
      </p>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "SignupPage",
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      handleSignup() {
        // Mock signup action
        alert(`Account created for: ${this.email}`);
        this.$router.push("/"); // Redirect to home page
      },
      navigateToLogin() {
        this.$router.push("/login"); // Redirect to login page
      },
    },
  };
  </script>
  