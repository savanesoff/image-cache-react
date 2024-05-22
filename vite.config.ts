import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ImageCacheReact',
    },
    sourcemap: true, // Enable source maps
    rollupOptions: {
      external: ['react', 'react-dom', 'tslib'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          dir: 'dist/esm',
          sourcemap: true,
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          dir: 'dist/cjs',
          sourcemap: true,
        },
      ],
    },
  },
  plugins: [react(), tsconfigPaths()],
});
