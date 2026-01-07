<template>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">基础用法</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="50" layout="pager" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+每页容量</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, sizes" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+页面跳转</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, jumper" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+总页数</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, total" :show-range="false" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+每页容量+页面跳转</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, sizes, jumper" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+每页容量+展示总数</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" :layout="['pager', 'sizes', 'total']" :show-range="false" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">+页面跳转+展示总数</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, jumper, total" :show-range="false" />
    </h-col>
  </h-row>
  <h-row :gutter="10" align="middle">
    <h-col :span="6">
      <div class="demo-title">全部展示</div>
    </h-col>
    <h-col :span="18">
      <h-pagination :total="100" layout="pager, jumper, total, sizes" :show-range="false" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
