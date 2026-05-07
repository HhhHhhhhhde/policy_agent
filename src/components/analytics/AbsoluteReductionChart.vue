<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartEl = ref(null)
let chart

const labels = ['3M', '2Y', '10Y']
const values = [0.00025197, 0.01595534, 0.01809159]

onMounted(() => {
  chart = echarts.init(chartEl.value)
  chart.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, top: 30, bottom: 30 },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: '#1d3557' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (v) => Number(v).toFixed(3),
      },
      splitLine: {
        lineStyle: { color: '#e5e7eb' },
      },
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: '42%',
        label: {
          show: true,
          position: 'top',
          formatter: ({ value }) => Number(value).toFixed(8),
          color: '#1d3557',
          fontWeight: 700,
        },
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#77b2dc' },
            { offset: 1, color: '#1d3557' },
          ]),
        },
      },
    ],
  })
  window.addEventListener('resize', chart.resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', chart?.resize)
  chart?.dispose()
})
</script>

<template>
  <div ref="chartEl" style="height: 320px"></div>
</template>
