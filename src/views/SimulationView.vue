<template>
  <el-card class="card">
    <template #header>
      <strong>仿真参数设置</strong>
    </template>
    <el-form label-width="140px">
      <el-form-item label="交易员数量">
        <el-input model-value="30" disabled />
      </el-form-item>
      <el-form-item label="基准利率假设">
        <el-input model-value="5.25%" disabled />
      </el-form-item>
      <el-form-item label="模型批次">
        <el-tag type="primary">Batch-A / 稳定沟通策略</el-tag>
      </el-form-item>
    </el-form>
  </el-card>
</template>
