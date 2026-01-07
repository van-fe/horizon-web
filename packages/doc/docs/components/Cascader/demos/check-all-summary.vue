<template>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">全选后标记为“全部”</div>
      <h-cascader v-model="values1" :multiple="true" :use-check-all-summary="true" :to-body="false" :collapse-tags="true" :options="baseData" />
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">全选后自定义标记为“全部选择”</div>
      <h-cascader v-model="values2" :multiple="true" :use-check-all-summary="true" check-all-summary-text="全部选择" :to-body="false" :collapse-tags="true" :options="baseData" />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const values1 = ref([]);
const values2 = ref([]);
const baseData = ref([]);

onMounted(async()=>{
  baseData.value = await fetch('https://static.nio.com/fx-static/horizon-web/clhoirqpc0000088sgljrau3o/cascader-options.json').then(r => r.json());
});
</script>

