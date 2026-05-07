<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartEl = ref(null)
let chart
let handleResize

const segments = [
  { name: '3M', value: 2.567, color: '#457b9d' },
  { name: '2Y', value: 5.049, color: '#1d3557' },
  { name: '10Y', value: 10.813, color: '#e63946' },
]

onMounted(() => {
  chart = echarts.init(chartEl.value)

  const pieSeries = segments.map((segment, index) => ({
    name: segment.name,
    type: 'pie',
    radius: [20 + index * 18 + '%', 29 + index * 18 + '%'],
    center: ['50%', '52%'],
    silent: true,
    label: {
      show: true,
      position: 'center',
      formatter: index === 2 ? `10Y\n${segment.value.toFixed(3)}%` : '',
      color: '#1d3557',
      fontSize: 16,
      fontWeight: 700,
    },
    data: [
      {
        value: segment.value,
        itemStyle: { color: segment.color },
        name: `${segment.name}: ${segment.value.toFixed(3)}%`,
      },
      {
        value: 100 - segment.value,
        itemStyle: { color: '#e5e7eb' },
        tooltip: { show: false },
      },
    ],
  }))

  chart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: (p) => (p.name.includes(':') ? p.name : ''),
    },
    series: pieSeries,
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '84%',
        style: {
          text: '10Y 优化效率最高（10.81%）',
          fill: '#e63946',
          fontWeight: 700,
          fontSize: 14,
        },
      },
    ],
  })

  handleResize = () => chart.resize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>

<template>
  <div ref="chartEl" style="height: 320px"></div>
</template>
