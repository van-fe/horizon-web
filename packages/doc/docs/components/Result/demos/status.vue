<template>
  <h-row :gutter="10">
    <h-col :span="24">
      <h-result title="403" subtitle="对不起，您无权限访问此页面。" type="403" />
    </h-col>
    <h-divider />
    <h-col :span="24">
      <h-result title="404" subtitle="对不起，您访问的页面不存在。" type="404" />
    </h-col>
    <h-divider />
    <h-col :span="24">
      <h-result title="500" subtitle="对不起，服务器出了点问题" type="500" />
    </h-col>
  </h-row>
</template>
<script setup lang="ts">
</script>
