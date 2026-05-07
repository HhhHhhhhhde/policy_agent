<script setup>
import { computed } from 'vue'
import AbsoluteReductionChart from '../components/analytics/AbsoluteReductionChart.vue'
import RelativeReductionRings from '../components/analytics/RelativeReductionRings.vue'
import HeatmapChart from '../components/analytics/HeatmapChart.vue'

const percentages = [2.567, 5.049, 10.813]
const avgReduction = computed(
  () => `${(percentages.reduce((sum, value) => sum + value, 0) / percentages.length).toFixed(2)}%`,
)
</script>

<template>
  <div class="analytics-page">
    <el-row :gutter="16">
      <el-col :span="12">
        <el-card class="card">
          <template #header>
            <strong>分歧度绝对下降值 (Absolute Reduction)</strong>
          </template>
          <AbsoluteReductionChart />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card">
          <template #header>
            <strong>相对优化效率 (Relative Reduction %)</strong>
          </template>
          <RelativeReductionRings />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="card heatmap-card">
      <template #header>
        <strong>期限利差分歧热力图（优化后由红转蓝）</strong>
      </template>
      <HeatmapChart />
    </el-card>

    <el-card class="card summary-card">
      <p>平均降低市场分歧度约 {{ avgReduction }}</p>
    </el-card>
  </div>
</template>

<style scoped>
.analytics-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.heatmap-card {
  margin-top: 4px;
}

.summary-card p {
  margin: 0;
  font-size: 18px;
  color: #1d3557;
  font-weight: 700;
}
</style>
