<template>
  <div>
    <n-scrollbar ref="scrollbar" height="400px" @scroll="onScroll">
      <div v-for="item of 20" :key="item" class="item">
        {{ item }}
      </div>
    </n-scrollbar>
    <div class="slider mt-2">
      <n-slider v-model="value" :min="0" :max="scrollHeight" :tooltip-enable="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { NScrollbar } from '@nio-fe/lego';

const scrollbar = ref<typeof NScrollbar | null>(null);
const scrollHeight = ref(0);
const value = ref(0);

watch(value, val => {
  scrollbar.value?.setScrollTop(val);
});

function onScroll({scrollTop}: {scrollTop: number, scrollLeft: number}) {
  value.value = scrollTop;
}

onMounted(() => {
  scrollHeight.value = scrollbar.value?.wrapRef.scrollHeight - scrollbar.value?.wrapRef.offsetHeight;
});
</script>

<style scoped>
.item {
  height: 40px;
  background: var(--n-bg-info-weak-default);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.slider {
  width: 90%;
  margin: 0 auto;
}
</style>
