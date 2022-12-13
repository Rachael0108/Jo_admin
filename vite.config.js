import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({mode, command})=> {
  const scssResources = []
  fs.readdirSync('src/styles/resources').map((dirname) => {
    if (fs.statSync(`src/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@use "src/styles/resources/${dirname}" as *;`)
    }
  })
  return {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "[hash].[name].[ext]"
        }
      },
      assetsInlineLimit: 40960000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join(''),
        },
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      // legacy({
      //   targets: ["defaults", "not IE 11"]
      // })
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
    test: {
      global: true,
      environment: 'happy-dom'
    },
    //反向代理
    server: {
      host: '0.0.0.0',
      ssr: false,
      base: '/',
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
  }
    }
)
