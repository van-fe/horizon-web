<template>
  <div class="demo-block">
    <h-tooltip placement="top">
      <h-button>Medium(default)</h-button>
      <template #content>Medium</template>
    </h-tooltip>
    <h-tooltip placement="top" size="small">
      <h-button>Small</h-button>
      <template #content>
        Small
      </template>
    </h-tooltip>
    <h-tooltip placement="top" size="small" :arrow="false" :distance="4">
      <h-button>No arrow</h-button>
      <template #content>
        No arrow
      </template>
    </h-tooltip>
  </div>
</template>

<script lang="ts">
</script>

<style scoped>
.demo-block {
  display: flex;
  align-items: center;
}

.demo-block .h-popover__reference {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 20px;
}
</style>
