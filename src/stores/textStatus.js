import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTextStatusStore = defineStore('textStatus', () => {
  const textStatus = ref('未处理')

  function markProcessed() {
    textStatus.value = '已优化'
  }

  function resetStatus() {
    textStatus.value = '未处理'
  }

  return {
    textStatus,
    markProcessed,
    resetStatus,
  }
})
