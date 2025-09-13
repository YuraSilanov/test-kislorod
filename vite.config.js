import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import path from 'path';

export default defineConfig({
  plugins: [
    pugPlugin(),

    eslint({
      cache: false,
      include: ['src/**/*.js', 'src/**/*.pug'],
      emitWarning: true,
      emitError: true,
      failOnWarning: false,
      failOnError: false,
    }),
 
    stylelint({
      include: ['src/**/*.{css,scss,sass}'],
      emitErrors: true,   
      emitWarnings: true,
      failOnError: false,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  root: 'src',

  build: {
    outDir: '../dist',
  },
});
