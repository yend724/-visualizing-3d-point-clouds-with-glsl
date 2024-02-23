import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/visualizing-3d-point-clouds-with-glsl/',
  test: {
    include: ['**/*.test.?(c|m)[jt]s?(x)'],
  },
  plugins: [react()],
});
