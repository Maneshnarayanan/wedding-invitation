import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,   // expose on all network interfaces (LAN / Wi-Fi)
    port: 5173,
  },
});
