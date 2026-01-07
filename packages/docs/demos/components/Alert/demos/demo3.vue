<template>
  <h-alert
    title="标题"
    type="info"
    description="这是一条提示消息"
    show-icon
    primary-button-text="按钮"
    default-button-text="按钮"
  />
  <h-alert
    title="标题"
    type="info"
    :description="contentLong"
    show-icon
    primary-button-text="primary"
    default-button-text="default"
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
