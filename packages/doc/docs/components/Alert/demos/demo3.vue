<template>
  <h-alert
    title="标题"
    type="info"
    description="这是一条提示消息"
    show-icon
    primary-buttoh-text="按钮"
    default-buttoh-text="按钮"
  />
  <h-alert
    title="标题"
    type="info"
    :description="contentLong"
    show-icon
    primary-buttoh-text="primary"
    default-buttoh-text="default"
  />
</template>

<style scoped>
.h-alert {
  margin: 20px 0 0;
}

.h-alert:first-child {
  margin: 0;
}
</style>
<script setup lang="ts">
const contentLong = '这是一条提示消息'.repeat(20);
</script>
