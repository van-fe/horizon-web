<template>
  <div id="scroll-2" class="target-wrapper">
    <div class="target-container">
      <n-affix ref="affixDomRef" position="top" target="#scroll-2" :offset="20">
        <n-button>Affix in container and won't placed out of container</n-button>
      </n-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const affixDomRef = ref();

function onScroll() {
  affixDomRef.value?.updatePosition();
}

onMounted(() => {
  document.body.querySelector('.n-main')?.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  document.body.querySelector('.n-main')?.removeEventListener('scroll', onScroll);
});
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
  padding-top: 20px;
}
</style>
