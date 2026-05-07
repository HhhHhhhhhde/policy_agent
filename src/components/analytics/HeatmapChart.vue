<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartEl = ref(null)
let chart
let timer
let handleResize

const yLabels = ['3M', '2Y', '10Y']
const xLabels = Array.from({ length: 10 }, (_, i) => `段落${i + 1}`)

const beforeMatrix = [
  [0.52, 0.56, 0.58, 0.62, 0.57, 0.61, 0.65, 0.59, 0.55, 0.52],
  [0.61, 0.66, 0.68, 0.7, 0.67, 0.69, 0.72, 0.66, 0.63, 0.6],
  [0.74, 0.78, 0.81, 0.84, 0.8, 0.83, 0.86, 0.79, 0.76, 0.73],
]

const afterMatrix = [
  [0.21, 0.2, 0.19, 0.22, 0.2, 0.21, 0.23, 0.2, 0.18, 0.19],
  [0.26, 0.24, 0.23, 0.25, 0.24, 0.24, 0.26, 0.23, 0.22, 0.21],
  [0.31, 0.29, 0.28, 0.3, 0.29, 0.3, 0.32, 0.29, 0.27, 0.26],
]

function flatten(matrix) {
  const arr = []
  matrix.forEach((row, y) => row.forEach((value, x) => arr.push([x, y, value])))
  return arr
}

function mergeStage(step) {
  return beforeMatrix.map((row, y) =>
    row.map((value, x) => {
      if (x <= step) {
        return afterMatrix[y][x]
      }
      return value
    }),
  )
}

onMounted(() => {
  chart = echarts.init(chartEl.value)
  chart.setOption({
    tooltip: {
      position: 'top',
      formatter: ({ data }) => `${yLabels[data[1]]} - ${xLabels[data[0]]}: ${data[2].toFixed(2)}`,
    },
    grid: { left: 55, right: 20, top: 25, bottom: 40 },
    xAxis: {
      type: 'category',
      data: xLabels,
      splitArea: { show: true },
      axisLabel: { interval: 0, fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: yLabels,
      splitArea: { show: true },
    },
    visualMap: {
      min: 0.15,
      max: 0.9,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: {
        color: ['#1d3557', '#457b9d', '#f1faee', '#e63946', '#a4161a'],
      },
    },
    series: [
      {
        type: 'heatmap',
        data: flatten(beforeMatrix),
        label: {
          show: true,
          formatter: ({ data }) => data[2].toFixed(2),
          color: '#fff',
          fontSize: 10,
        },
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
      },
    ],
  })

  let step = -1
  timer = window.setInterval(() => {
    step += 1
    const stage = mergeStage(step)
    chart.setOption({
      series: [{ data: flatten(stage) }],
    })
    if (step >= 9) {
      window.clearInterval(timer)
    }
  }, 500)

  handleResize = () => chart.resize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>

<template>
  <div ref="chartEl" style="height: 380px"></div>
</template>
