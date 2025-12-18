<template>
  <div class="demo-block">
    <n-button v-tooltip="{ content: 'Hello World' }" type="normal" plain>Hover</n-button>
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
