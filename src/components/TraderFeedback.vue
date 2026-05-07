<script setup>
import { ref } from 'vue'

const feedbackPool = [
  { name: '交易员 A', type: '保守派', color: '#457b9d', text: '优化后的措辞减少了我对加息终点的猜测，10Y 债预期趋于平稳。' },
  { name: '交易员 B', type: '激进派', color: '#e63946', text: '虽然文本变清晰了，但我依然关注就业数据的修正。' },
  { name: '交易员 C', type: '趋势追随', color: '#1d3557', text: '分歧度指标下降，市场波动率预期随之降低。' },
  { name: '交易员 D', type: '鸽派', color: '#6aa3c8', text: '措辞的时间锚更明确，短端利率预期波动明显收敛。' },
  { name: '交易员 E', type: '鹰派', color: '#c1121f', text: '我更关注后续 CPI 数据是否验证前瞻指引。' },
  { name: '交易员 F', type: '量化派', color: '#3a86ff', text: '语义方差下降后，模型给出的情景分布更集中。' },
  { name: '交易员 G', type: '价值派', color: '#264653', text: '长期通胀目标重申后，10Y 估值区间更容易定价。' },
]

const visibleFeedback = ref(feedbackPool.slice(0, 4))

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function refreshFeedback() {
  const count = Math.floor(Math.random() * 3) + 3
  visibleFeedback.value = shuffle(feedbackPool).slice(0, count)
}
</script>

<template>
  <el-card class="card feedback-card">
    <template #header>
      <div class="header-row">
        <strong>异质性交易员反馈流</strong>
        <el-button type="primary" plain @click="refreshFeedback">刷新仿真结果</el-button>
      </div>
    </template>

    <el-timeline>
      <el-timeline-item
        v-for="item in visibleFeedback"
        :key="`${item.name}-${item.text}`"
        :timestamp="item.type"
        placement="top"
      >
        <div class="feedback-item">
          <div class="avatar" :style="{ backgroundColor: item.color }">
            {{ item.name.slice(-1) }}
          </div>
          <div class="bubble">
            <p class="name">{{ item.name }}</p>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<style scoped>
.feedback-card {
  margin-top: 16px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feedback-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.bubble {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 10px;
  border-radius: 10px;
}

.bubble p {
  margin: 0;
}

.name {
  margin-bottom: 4px !important;
  color: #1d3557;
  font-weight: 700;
}
</style>
