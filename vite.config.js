import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Buffer } from 'buffer';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),nodePolyfills()],
  resolve: {
    alias: {
      buffer: 'buffer/',
      process: 'process/',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      util: 'util/',
      assert: 'assert/',
      path: 'path-browserify'
    },
  },
  define: {
    'process.env': {},
    global: 'window',
    Buffer: Buffer,
    process: process,
  },
});
