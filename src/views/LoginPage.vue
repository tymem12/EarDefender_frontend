<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center text-gray-800">
        Log In
      </h2>
      <form
        class="mt-6 space-y-4"
        @submit.prevent="handleLogin"
      >
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
            placeholder="Enter your password"
            required
          >
        </div>
        <button 
          type="submit" 
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>
      <p class="text-sm text-center mt-4 text-gray-600">
        Don't have an account? 
        <a 
          class="text-blue-600 hover:underline cursor-pointer" 
          @click="navigateToSignup"
        >
          Sign Up
        </a>
      </p>
    </div>
  </div>
</template>
  
<script>
import axios from '@/axios';

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('/auth/login', {
          email: this.email,
          password: this.password
        });
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        alert('Login successful');
        this.$router.push("/");
      } catch (error) {
        alert('Login failed: ' + error.response.data.message);
      }
    },
    navigateToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>
