<template>
  <h-alert
    show-icon
    :closable="true"
    size="small"
    title="small"
    description="Info Text"
    type="info"
  />
  <h-alert
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
.h-alert {
  margin: 20px 0 0;
}

.h-alert:first-child {
  margin: 0;
}
</style>
<script setup lang="ts"></script>
