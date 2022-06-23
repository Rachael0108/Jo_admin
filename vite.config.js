import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  define: {
    'process.env': {
      'VUE_APP_SIGN': ''
    }
  },
  //反向代理
  server: {
    host: '0.0.0.0',
    ssr: false,
    base: './',
    outDir: 'dist',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',  //后端提供的接口地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
  }
  },
})
