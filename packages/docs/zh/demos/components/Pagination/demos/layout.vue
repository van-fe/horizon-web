<template>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">基础用法</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="50" layout="pager" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">+每页容量</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" layout="pager, sizes" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">+页面跳转</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" layout="pager, jumper" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">+总页数</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" layout="pager, total" :show-range="false" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">+每页容量+页面跳转</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" layout="pager, sizes, jumper" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">+每页容量+展示总数</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" :layout="['pager', 'sizes', 'total']" :show-range="false" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">+页面跳转+展示总数</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" layout="pager, jumper, total" :show-range="false" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">全部展示</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" layout="pager, jumper, total, sizes" :show-range="false" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
