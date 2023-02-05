import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    eslint({
      include: ['**/*.ts', '**/*.tsx'],
      exclude: ['node_modules'],
      extensions: ['.ts', '.tsx']
    }),
  ],
});
