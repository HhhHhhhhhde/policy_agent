<script setup>
import { computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import TraderFeedback from '../components/TraderFeedback.vue'
import { useTextStatusStore } from '../stores/textStatus'

const md = new MarkdownIt()
const textStatusStore = useTextStatusStore()
const simulating = ref(false)
const simulationProgress = ref(0)

const optimizedText =
  'The Committee maintains a strict 2% inflation target. We will adjust the federal funds rate based on the next two CPI reports to ensure price stability.'

const dialogueItems = computed(() => [
  {
    role: '系统',
    markdown:
      '### 沟通任务\n请对 FOMC 文本进行语义降噪，降低交易员解释分歧并提高可执行性。',
  },
  {
    role: '分析引擎',
    markdown: `- 原文判定：**高模糊度**\n- 优化后判定：**高透明度**\n- 当前文本状态：\`${textStatusStore.textStatus}\``,
  },
])

function runSimulation() {
  if (simulating.value) return
  simulating.value = true
  simulationProgress.value = 0
  textStatusStore.resetStatus()

  const timer = window.setInterval(() => {
    simulationProgress.value += 12
    if (simulationProgress.value >= 100) {
      simulationProgress.value = 100
      window.clearInterval(timer)
      simulating.value = false
      textStatusStore.markProcessed()
    }
  }, 280)
}
</script>

<template>
  <div class="chat-page">
    <div class="chat-layout">
      <el-card class="card dialogue-panel">
        <template #header>
          <strong>对话流（Markdown）</strong>
        </template>
        <div v-for="item in dialogueItems" :key="item.role" class="dialogue-item">
          <p class="role">{{ item.role }}</p>
          <div class="markdown" v-html="md.render(item.markdown)"></div>
        </div>
      </el-card>

      <el-card class="card compare-panel">
        <template #header>
          <strong>文本优化对比面板</strong>
        </template>

        <div class="section">
          <p class="label danger">原文（高模糊度）</p>
          <p class="content">
            The Committee expects that with
            <el-tooltip content="LLM 交易员对该词汇的解释标准差（SD）为 0.025，属于严重歧义。">
              <span class="danger-highlight">appropriate policy firming</span>
            </el-tooltip>
            , inflation will return to its 2 percent objective, though
            <el-tooltip content="LLM 交易员对该词汇的解释标准差（SD）为 0.025，属于严重歧义。">
              <span class="danger-highlight">uncertainty remains</span>
            </el-tooltip>
            regarding the terminal rate.
          </p>
        </div>

        <div class="section">
          <p class="label success">优化后（高透明度）</p>
          <p class="content success-text">{{ optimizedText }}</p>
        </div>

        <div class="sim-area">
          <el-button
            type="danger"
            size="large"
            :loading="simulating"
            class="sim-btn"
            @click="runSimulation"
          >
            启动 30 名 LLM 交易员进行多主体仿真
          </el-button>
          <el-progress
            v-if="simulating || simulationProgress === 100"
            :percentage="simulationProgress"
            :status="simulationProgress === 100 ? 'success' : ''"
          />
        </div>
      </el-card>
    </div>

    <TraderFeedback />
  </div>
</template>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
}

.chat-layout {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 16px;
}

.dialogue-item + .dialogue-item {
  border-top: 1px dashed #d1d5db;
  margin-top: 12px;
  padding-top: 12px;
}

.role {
  margin: 0 0 6px;
  color: #1d3557;
  font-weight: 700;
}

.markdown :deep(p),
.markdown :deep(ul) {
  margin: 6px 0;
}

.section + .section {
  margin-top: 14px;
}

.label {
  margin: 0 0 8px;
  font-weight: 700;
}

.danger {
  color: #e63946;
}

.success {
  color: #2a9d8f;
}

.content {
  margin: 0;
  line-height: 1.8;
  color: #334155;
}

.danger-highlight {
  background: rgba(230, 57, 70, 0.18);
  color: #a4161a;
  border-radius: 4px;
  padding: 1px 4px;
  font-weight: 700;
  cursor: pointer;
}

.success-text {
  color: #1d3557;
  background: #edf6f9;
  border-left: 4px solid #2a9d8f;
  padding: 8px 10px;
  border-radius: 6px;
}

.sim-area {
  margin-top: 18px;
}

.sim-btn {
  width: 100%;
  margin-bottom: 10px;
}
</style>
