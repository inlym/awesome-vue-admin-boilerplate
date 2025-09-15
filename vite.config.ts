import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 指定环境变量文件的目录
  // Vite 会根据当前模式自动加载对应的环境文件：
  // - 开发模式：加载 env/.env 和 env/.env.dev
  // - 生产模式：加载 env/.env 和 env/.env.prod
  envDir: './env',
})
