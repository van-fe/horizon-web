<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-modal-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :options="baseData"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-modal-cascader
        v-model="currentVal2"
        :clearable="true"
        :options="baseData"
        :multiple="true"
        :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">单选-仅展示叶子节点</div>
      <n-modal-cascader
        v-model="currentVal3"
        :clearable="true"
        :options="baseData"
        show-checked-strategy="leaf"
        :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选-仅展示叶子节点</div>
      <n-modal-cascader
        v-model="currentVal4"
        :clearable="true"
        :options="baseData"
        show-checked-strategy="leaf"
        :multiple="true"
        :to-body="false"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[]>(["guide", "navigation", "side"]);
const currentVal2 = ref<string[][]>([["guide", "navigation", "side"]]);
const currentVal3 = ref<string[]>(["guide", "navigation", "side"]);
const currentVal4 = ref<string[][]>([["guide", "navigation", "side"]]);

const baseData = ref([]);

onMounted(async()=>{
  baseData.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
});
</script>
