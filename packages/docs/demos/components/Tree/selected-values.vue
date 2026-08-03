<template>
  <h-grid :gap="12">
    <h-grid-item :span="12">
      <div class="demo-title">单选</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(0)">修改</h-button> {{ selectedValues[0].value }}</div>
      <h-tree
        v-if="baseTreeData.length"
        v-model:selected-values="selectedValues[0].value"
        :tree-data="baseTreeData"
        :max-height="300"
      />
    </h-grid-item>
    <h-grid-item :span="12">
      <div class="demo-title">多选</div>
      <div class="demo-description"><h-button :plain="true" size="small" @click="change(1)">修改</h-button> {{ selectedValues[1].value }}</div>
      <h-tree
        v-if="baseTreeData.length"
        v-model:selected-values="selectedValues[1].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :multiple="true"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const selectedValues = [
  ref(['feedback']),
  ref<string[]>([]),
];

function change(index: number) {
  selectedValues[index].value = index % 2 === 0 ? ['radio'] : ['radio', 'tag'];
}


onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });

  selectedValues[1].value.push('feedback', 'efficiency');
});
</script>

<style scoped>
</style>
