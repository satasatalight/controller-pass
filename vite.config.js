import { defineConfig } from 'vite'

export default defineConfig
({
    server: {
        port: 8080,
        proxy: {
          '/foo': 'http://localhost:8080',
          '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false,
          },
        },
    }
});