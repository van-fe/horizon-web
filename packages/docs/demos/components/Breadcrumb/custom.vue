<template>
  <section class="docs-demo">
    <h-breadcrumb>
      <h-breadcrumb-item>
        Workspace
        <template #separator>→</template>
      </h-breadcrumb-item>
      <h-breadcrumb-item>
        Release candidate
        <IconRepairFilled :size="12" />
        <template #separator>·</template>
      </h-breadcrumb-item>
      <h-breadcrumb-item>Verification</h-breadcrumb-item>
    </h-breadcrumb>
  </section>
</template>

<script setup lang="ts">
import { IconRepairFilled } from '@aurora/icon';
</script>
