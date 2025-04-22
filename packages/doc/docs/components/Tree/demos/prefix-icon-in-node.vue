<template>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree
        :tree-data="baseTreeData"
        :prefix-icon="IconChart"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :tree-data="baseTreeData"
        :prefix-icon="IconChart"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IconChart } from '@nio-fe/icon';

const baseTreeData = ref([]);

onMounted(() => {
  fetch('https://static.nio.com/fx-static/lego/cm5ndhl4l00h3082u2feh8p5y/tree-data-with-prefix-icon.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>
