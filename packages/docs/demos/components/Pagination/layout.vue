<template>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">基础用法</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="50" layout="pager" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">+每页容量</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" layout="pager, sizes" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">+页面跳转</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" layout="pager, jumper" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">+总页数</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" layout="pager, total" :show-range="false" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">+每页容量+页面跳转</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" layout="pager, sizes, jumper" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">+每页容量+展示总数</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" :layout="['pager', 'sizes', 'total']" :show-range="false" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">+页面跳转+展示总数</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" layout="pager, jumper, total" :show-range="false" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">全部展示</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" layout="pager, jumper, total, sizes" :show-range="false" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
