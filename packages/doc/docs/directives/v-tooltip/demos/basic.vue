<template>
  <div class="demo-block">
    <h-button v-tooltip="{ content: 'Hello World' }" type="normal" plain>Hover</h-button>
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
