<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTextStatusStore } from './stores/textStatus'

const route = useRoute()
const router = useRouter()
const textStatusStore = useTextStatusStore()
const collapsed = ref(false)

const navItems = [
  { label: '智能对话', path: '/chat', icon: '💬' },
  { label: '分歧度仪表盘', path: '/analytics', icon: '📊' },
  { label: '仿真参数设置', path: '/simulation', icon: '⚙️' },
  { label: '研究背景', path: '/about', icon: '📘' },
]

const breadcrumbs = computed(() => route.meta.breadcrumb ?? ['首页'])
</script>

<template>
  <el-container class="app-shell">
    <el-aside :width="collapsed ? '76px' : '250px'" class="app-sidebar">
      <div class="sidebar-toggle">
        <el-button
          circle
          size="small"
          type="primary"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? '>' : '<' }}
        </el-button>
      </div>

      <el-menu
        class="side-menu"
        :default-active="route.path"
        :collapse="collapsed"
        @select="(path) => router.push(path)"
      >
        <el-menu-item v-for="item in navItems" :key="item.path" :index="item.path">
          <span class="menu-icon">{{ item.icon }}</span>
          <template #title>{{ item.label }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="app-header">
        <div class="title-wrap">
          <div class="logo">CB</div>
          <div>
            <h1>央行经济智能体 (CB-EA): 金融稳定沟通优化系统</h1>
            <p>文本状态：{{ textStatusStore.textStatus }}</p>
          </div>
        </div>

        <div class="status-cards">
          <el-card shadow="hover" class="status-card">
            <p class="k">模拟交易员数量</p>
            <p class="v">30 位</p>
          </el-card>
          <el-card shadow="hover" class="status-card">
            <p class="k">基准利率</p>
            <p class="v">5.25%</p>
          </el-card>
          <el-card shadow="hover" class="status-card">
            <p class="k">当前波动率指数</p>
            <p class="v">中低</p>
          </el-card>
        </div>
      </el-header>

      <el-main class="app-main">
        <el-breadcrumb separator="/" class="app-breadcrumb">
          <el-breadcrumb-item v-for="item in breadcrumbs" :key="item">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
