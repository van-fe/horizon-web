<template>
  <n-row :gutter="10">
    <n-col :span="24">
      <n-result title="403" subtitle="对不起，您无权限访问此页面。" type="403" />
    </n-col>
    <n-divider />
    <n-col :span="24">
      <n-result title="404" subtitle="对不起，您访问的页面不存在。" type="404" />
    </n-col>
    <n-divider />
    <n-col :span="24">
      <n-result title="500" subtitle="对不起，服务器出了点问题" type="500" />
    </n-col>
  </n-row>
</template>
<script setup lang="ts">
</script>
