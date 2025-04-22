<template>
  <n-alert
    show-icon
    :closable="true"
    size="small"
    title="small"
    description="Info Text"
    type="info"
  />
  <n-alert
    show-icon
    :closable="true"
    primary-button-text="确定"
    default-button-text="取消"
    size="medium"
    title="medium"
    description="Info Text"
    type="info"
  />
</template>

<style scoped>
.n-alert {
  margin: 20px 0 0;
}

.n-alert:first-child {
  margin: 0;
}
</style>
<script setup lang="ts"></script>
