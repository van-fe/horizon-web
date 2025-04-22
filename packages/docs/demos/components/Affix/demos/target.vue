<template>
  <div id="scroll" class="target-wrapper">
    <div class="target-container">
      <n-affix target=".target-wrapper">
        <n-button>Affix in container</n-button>
      </n-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.target-wrapper {
  height: 200px;
  border: 1px solid var(--n-border-default);
  overflow: auto;
}

.target-container {
  height: 1000px;
  background: var(--n-bg-weak-activated);
  padding-top: 50px;
}
</style>
