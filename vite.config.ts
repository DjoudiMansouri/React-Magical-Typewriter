import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: [
        'src/demo', 
        '**/*.test.ts', 
        '**/*.test.tsx', 
        '**/*.stories.tsx',
        '**/*.gif',
        '**/*.svg'
      ],
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: true,
    }),
  ],
  base: '/React-Magical-Typewriter/',
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactMagicalTypewriter',
      fileName: (format) => `react-magical-typewriter.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'gsap'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'gsap': 'gsap'
        }
      }
    }
  }
});