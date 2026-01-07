<template>
  <div id="scroll" class="target-wrapper">
    <div class="target-container">
      <h-affix target=".target-wrapper">
        <h-button>Affix in container</h-button>
      </h-affix>
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
