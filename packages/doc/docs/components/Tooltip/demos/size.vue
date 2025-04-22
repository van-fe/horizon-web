<template>
  <div class="demo-block">
    <n-tooltip placement="top">
      <n-button type="normal" plain>Medium(default)</n-button>
      <template #content>Medium</template>
    </n-tooltip>
    <n-tooltip placement="top" size="small">
      <n-button type="normal" plain>Small</n-button>
      <template #content>Small</template>
    </n-tooltip>
    <n-tooltip placement="top" size="small" :arrow="false" :distance="4">
      <n-button type="normal" plain>No arrow</n-button>
      <template #content>No arrow</template>
    </n-tooltip>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.demo-block {
  display: flex;
  align-items: center;
}

.demo-block .n-popover__reference {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 20px;
}
</style>
