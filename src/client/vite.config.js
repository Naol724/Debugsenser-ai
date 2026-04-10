import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: path.resolve(__dirname, '../client'),
    build: {
        outDir: path.resolve(__dirname, '../../dist'),
        emptyOutDir: true,
        minify: 'esbuild',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    ui: ['react-markdown']
                }
            }
        },
        chunkSizeWarningLimit: 1000,
        target: 'es2015'
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
});
