<template>
  <n-tag :clickable="false" :icon="IconEye" :plain="true">View</n-tag>
  <n-tag :clickable="false" :icon="IconComplete" :plain="true" type="success">Success</n-tag>
  <n-tag :clickable="false" :icon="IconHelp" :plain="true" type="info">Info</n-tag>
  <n-tag :clickable="false" :icon="IconRemind" :plain="true" type="warning">Warning</n-tag>
  <n-tag :clickable="false" :plain="true" type="error">
    <template #icon>
      <IconCloseCircle :size="12" />
    </template>
    Error
  </n-tag>
</template>

<script setup lang="ts">
import {IconEye, IconComplete, IconHelp, IconRemind, IconCloseCircle} from '@aurora/icon';
</script>

<style scoped>
</style>
