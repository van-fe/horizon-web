<template>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :prefix-icon="IconChart"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :prefix-icon="IconChart"
        :multiple="true"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IconChart } from '@aurora/icon';

const baseTreeData = ref([]);

onMounted(() => {
  fetch('https://static.nio.com/fx-static/horizon-web/cm5ndhl4l00h3082u2feh8p5y/tree-data-with-prefix-icon.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>
