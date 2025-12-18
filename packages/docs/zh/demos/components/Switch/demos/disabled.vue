<template>
  <div>
    <n-switch label="disabled" :model-value="true" disabled />
    <n-switch label="disabled" :model-value="false" disabled class="ml-4" />
  </div>

  <div>
    <n-switch label="readonly" readonly />
    <n-switch class="ml-4" label="readonly" readonly :model-value="true" />
  </div>
</template>
<script setup lang="ts">
</script>
