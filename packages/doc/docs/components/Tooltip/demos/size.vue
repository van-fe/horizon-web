<template>
  <div class="demo-block">
    <h-tooltip placement="top">
      <h-button type="normal" plain>Medium(default)</h-button>
      <template #content>Medium</template>
    </h-tooltip>
    <h-tooltip placement="top" size="small">
      <h-button type="normal" plain>Small</h-button>
      <template #content>Small</template>
    </h-tooltip>
    <h-tooltip placement="top" size="small" :arrow="false" :distance="4">
      <h-button type="normal" plain>No arrow</h-button>
      <template #content>No arrow</template>
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
