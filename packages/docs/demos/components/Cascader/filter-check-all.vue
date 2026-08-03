<template>
  <h-grid :gap="12">
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">普通过滤全选</div>
      <h-cascader v-model="values" :multiple="true" :filterable="true" :use-filter-check-all="true" :to-body="false" :collapse-tags="true" :options="baseData" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const values= ref([]);
const baseData = ref([]);

onMounted(async()=>{
  baseData.value = await fetch(new URL('/unselectable-options.json', import.meta.url).href).then(r => r.json());
});
</script>

