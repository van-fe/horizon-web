<template>
  <div class="demo-block">
    <h-tooltip placement="top">
      <h-button>Theme(default)</h-button>
      <template #content>Dark</template>
    </h-tooltip>
    <h-tooltip placement="top" theme="light">
      <h-button>Light</h-button>
      <template #content>Light</template>
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
