import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/visualizing-3d-point-clouds-with-glsl/',
  plugins: [react()],
});
