import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        port: 8080
    },

    base: './',

    build: {
        rollupOptions: {
            input: {
                frontend:   resolve(__dirname, 'frontend.html'),
                backend:    resolve(__dirname, 'backend.html'),
                config:     resolve(__dirname, 'config.html'),
            },
        },
    },
});