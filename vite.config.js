import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/policy_agent/', // 👈 极其重要！必须替换为你 GitHub 仓库的名字，例如 /cb-economic-agent/
})