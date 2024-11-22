module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended', // Enable Vue 3 recommended rules
    ],
    parser: 'vue-eslint-parser', // Use Vue-specific parser
    parserOptions: {
      parser: '@babel/eslint-parser', // Use Babel parser for JS in Vue files
      requireConfigFile: false, // Avoid errors if no Babel config is present
    },
    rules: {
      // Custom rules here
      'vue/multi-word-component-names': 0, // Example: allow single-word components
    },
  };
  