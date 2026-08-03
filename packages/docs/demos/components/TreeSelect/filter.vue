<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :to-body="false"
        clearable
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :multiple="true"
        :to-body="false"
        clearable
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

function onFocus() {
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
