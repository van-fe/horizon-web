<script setup lang="ts">
import { AIcon } from '@aurora/icon';
</script>

<template>
  <div class="docs-demo__stage">
    <h-space wrap size="large">
      <h-link>
        查看其余 8 项
        <template #suffix>…</template>
      </h-link>
      <h-link :underline="false">
        <template #prefix><AIcon name="time" suffix="2xs" /></template>
        更新于 10:24
      </h-link>
    </h-space>
  </div>
</template>
