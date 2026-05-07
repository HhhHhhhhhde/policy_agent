<script setup>
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const TOTAL_TRADERS = 30

const baseConfig = reactive({
  traders: 30,
  policyRate: '5.25%',
  batch: 'Batch-A / 稳定沟通策略',
})

const traderMix = reactive({
  riskAverse: 10,
  neutral: 12,
  aggressive: 8,
})

const selectedHorizons = ref(['3M', '2Y', '10Y'])
const progress = ref(0)
const running = ref(false)
const statusText = ref('待运行')
let timer = null

const historyRecords = ref([
  { label: '短期窗口 (3M) 改善均值', value: '2.57%' },
  { label: '中期窗口 (2Y) 改善均值', value: '5.05%' },
  { label: '长期窗口 (10Y) 改善均值', value: '10.81%' },
])

const processStages = [
  { threshold: 33, text: 'LLM 语义提取中...' },
  { threshold: 66, text: '观点对齐计算中...' },
  { threshold: 100, text: '市场分歧度聚合中...' },
]

const overallMean = computed(() => {
  const values = [2.57, 5.05, 10.81]
  return `${(values.reduce((sum, item) => sum + item, 0) / values.length).toFixed(2)}%`
})

const totalCheck = computed(
  () => traderMix.riskAverse + traderMix.neutral + traderMix.aggressive,
)

function rebalanceMix(changedType, changedValue) {
  const keys = ['riskAverse', 'neutral', 'aggressive']
  const otherKeys = keys.filter((key) => key !== changedType)
  const rest = TOTAL_TRADERS - changedValue
  const sumOfOthers = traderMix[otherKeys[0]] + traderMix[otherKeys[1]]

  if (rest <= 0) {
    traderMix[otherKeys[0]] = 0
    traderMix[otherKeys[1]] = 0
    return
  }

  if (sumOfOthers === 0) {
    const first = Math.floor(rest / 2)
    traderMix[otherKeys[0]] = first
    traderMix[otherKeys[1]] = rest - first
    return
  }

  const firstValue = Math.round((traderMix[otherKeys[0]] / sumOfOthers) * rest)
  traderMix[otherKeys[0]] = firstValue
  traderMix[otherKeys[1]] = rest - firstValue
}

function handleMixChange(type, value) {
  traderMix[type] = value
  rebalanceMix(type, value)
}

function updateStatusText(value) {
  const stage = processStages.find((item) => value <= item.threshold)
  statusText.value = stage?.text ?? '仿真完成'
}

function runSimulation() {
  if (running.value) return
  running.value = true
  progress.value = 0
  statusText.value = '初始化参数中...'

  timer = window.setInterval(() => {
    progress.value += 8
    if (progress.value >= 100) {
      progress.value = 100
      statusText.value = '仿真完成'
      running.value = false
      window.clearInterval(timer)
      timer = null
      ElMessage.success('多主体仿真完成，结果已写入历史记录。')
      return
    }
    updateStatusText(progress.value)
  }, 260)
}

function resetSimulation() {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
  running.value = false
  progress.value = 0
  statusText.value = '待运行'
  traderMix.riskAverse = 10
  traderMix.neutral = 12
  traderMix.aggressive = 8
  selectedHorizons.value = ['3M', '2Y', '10Y']
  ElMessage.info('仿真参数已重置。')
}

function saveConfig() {
  ElMessage.success('当前仿真配置已保存。')
}

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <el-card class="card simulation-page">
    <template #header>
      <div class="page-header">
        <strong>仿真参数设置</strong>
        <el-tag type="info">科研演示模式</el-tag>
      </div>
    </template>

    <div class="block-grid">
      <el-card class="inner-card" shadow="never">
        <template #header>
          <span class="block-title">基础环境</span>
        </template>
        <el-form label-width="140px">
          <el-form-item label="交易员总量">
            <el-input :model-value="baseConfig.traders" disabled />
          </el-form-item>
          <el-form-item label="基准利率假设">
            <el-input :model-value="baseConfig.policyRate" disabled />
          </el-form-item>
          <el-form-item label="模型批次">
            <el-tag type="primary">{{ baseConfig.batch }}</el-tag>
          </el-form-item>
          <el-form-item label="观测期限">
            <el-checkbox-group v-model="selectedHorizons">
              <el-checkbox value="3M">短期 (3M)</el-checkbox>
              <el-checkbox value="2Y">中期 (2Y)</el-checkbox>
              <el-checkbox value="10Y">长期 (10Y)</el-checkbox>
            </el-checkbox-group>
            <p class="hint">对应当前分歧度下降实验的三个核心期限。</p>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="inner-card" shadow="never">
        <template #header>
          <span class="block-title">多主体参数</span>
        </template>
        <el-form label-width="170px">
          <el-form-item label="风险厌恶型 (Risk-Averse)">
            <el-slider
              :min="0"
              :max="TOTAL_TRADERS"
              :step="1"
              :model-value="traderMix.riskAverse"
              show-input
              @input="(value) => handleMixChange('riskAverse', value)"
            />
          </el-form-item>
          <el-form-item label="中性型 (Neutral)">
            <el-slider
              :min="0"
              :max="TOTAL_TRADERS"
              :step="1"
              :model-value="traderMix.neutral"
              show-input
              @input="(value) => handleMixChange('neutral', value)"
            />
          </el-form-item>
          <el-form-item label="激进型 (Aggressive)">
            <el-slider
              :min="0"
              :max="TOTAL_TRADERS"
              :step="1"
              :model-value="traderMix.aggressive"
              show-input
              @input="(value) => handleMixChange('aggressive', value)"
            />
          </el-form-item>
          <el-form-item label="一致性校验">
            <el-tag :type="totalCheck === TOTAL_TRADERS ? 'success' : 'danger'">
              总和 = {{ totalCheck }} / {{ TOTAL_TRADERS }}
            </el-tag>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <el-card class="inner-card status-card" shadow="never">
      <template #header>
        <span class="block-title">仿真动态状态</span>
      </template>
      <p class="status-text">{{ statusText }}</p>
      <el-progress
        :percentage="progress"
        :status="progress === 100 ? 'success' : ''"
        :stroke-width="16"
      />
      <div class="btn-row">
        <el-button type="primary" :loading="running" @click="runSimulation">启动仿真</el-button>
        <el-button type="warning" plain @click="resetSimulation">一键重置仿真</el-button>
        <el-button type="success" plain @click="saveConfig">保存配置</el-button>
      </div>
    </el-card>

    <el-card class="inner-card history-card" shadow="never">
      <template #header>
        <span class="block-title">仿真运行历史</span>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="record in historyRecords"
          :key="record.label"
          :timestamp="record.value"
          placement="top"
        >
          {{ record.label }}
        </el-timeline-item>
      </el-timeline>
      <div class="overall">
        <span>过去几次优化的分歧度改善均值：</span>
        <strong>{{ overallMean }}</strong>
      </div>
    </el-card>
  </el-card>
</template>

<style scoped>
.simulation-page {
  border-color: #d4dce6;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.block-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, 1fr));
  gap: 16px;
}

.inner-card {
  border: 1px solid #dbe6f2;
  background: linear-gradient(180deg, #ffffff, #f8fbff);
}

.block-title {
  color: #1d3557;
  font-weight: 700;
}

.hint {
  margin: 8px 0 0;
  color: #5b6b7b;
  font-size: 12px;
}

.status-card,
.history-card {
  margin-top: 16px;
}

.status-text {
  margin: 0 0 10px;
  color: #1d3557;
  font-weight: 600;
}

.btn-row {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.overall {
  margin-top: 4px;
  color: #1d3557;
}

.overall strong {
  margin-left: 6px;
  color: #e63946;
}
</style>
