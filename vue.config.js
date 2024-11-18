const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'vue'],
      }),
    ],
  },
});
