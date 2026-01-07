<template>
  <h-tag :clickable="false" :icon="IconEye" :plain="true">View</h-tag>
  <h-tag :clickable="false" :icon="IconComplete" :plain="true" type="success">Success</h-tag>
  <h-tag :clickable="false" :icon="IconHelp" :plain="true" type="info">Info</h-tag>
  <h-tag :clickable="false" :icon="IconRemind" :plain="true" type="warning">Warning</h-tag>
  <h-tag :clickable="false" :plain="true" type="error">
    <template #icon>
      <IconCloseCircle :size="12" />
    </template>
    Error
  </h-tag>
</template>

<script setup lang="ts">
import {IconEye, IconComplete, IconHelp, IconRemind, IconCloseCircle} from '@aurora/icon';
</script>

<style scoped>
</style>
