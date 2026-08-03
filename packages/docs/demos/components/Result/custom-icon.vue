<template>
  <section class="docs-demo">
    <h-result
      title="Generating accessibility report"
      subtitle="The report can take a moment for large component sets."
      :primary-button="false"
      :secondary-button="false"
    >
      <template #icon>
        <IconLoading size="56" spin="cw" />
      </template>
    </h-result>
  </section>
</template>

<script setup lang="ts">
import { IconLoading } from '@aurora/icon';
</script>
