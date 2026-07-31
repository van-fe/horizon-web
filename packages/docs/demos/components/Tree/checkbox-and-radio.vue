<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="单选显示单选框">
      <h-switch v-model="showRadio" :status="true" />
    </h-form-item>
    <h-form-item label="多选显示多选框">
      <h-switch v-model="showCheckbox" :status="true" />
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="12">
      <div class="demo-title">单选 </div>
      <h-tree
        :tree-data="baseTreeData"
        :show-radio="showRadio"
      />
    </h-grid-item>
    <h-grid-item :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :show-checkbox="showCheckbox"
        :multiple="true"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const showRadio = ref(false);
const showCheckbox = ref(true);

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
