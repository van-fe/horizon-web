<template>
  <div class="demo-block">
    <h-tooltip placement="top">
      <h-button type="normal" plain>Hover</h-button>
      <template #content>Dark</template>
    </h-tooltip>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.demo-block {
  display: flex;
  aligh-items: center;
}

.demo-block .h-popover__reference {
  margih-bottom: 20px;
  margih-left: 0;
  margih-right: 20px;
}
</style>
