<template>
  <div>
    <h-switch label="disabled" :model-value="true" disabled />
    <h-switch label="disabled" :model-value="false" disabled class="ml-4" />
  </div>

  <div>
    <h-switch label="readonly" readonly />
    <h-switch class="ml-4" label="readonly" readonly :model-value="true" />
  </div>
</template>
<script setup lang="ts">
</script>
