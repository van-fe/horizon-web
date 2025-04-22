<template>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <div class="demo-description"><n-button :plain="true" size="small" @click="change(0)">修改</n-button> {{ expandValues[0].value }}</div>
      <n-tree
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[0].value"
        :tree-data="baseTreeData"
        :max-height="300"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <div class="demo-description"><n-button :plain="true" size="small" @click="change(1)">修改</n-button> {{ expandValues[1].value }}</div>
      <n-tree
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[1].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :multiple="true"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">单选 - 父级不默认展开</div>
      <div class="demo-description"><n-button :plain="true" size="small" @click="change(2)">修改</n-button> {{ expandValues[2].value }}</div>
      <n-tree
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[2].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :is-default-expand-parent="false"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选 - 父级不默认展开</div>
      <div class="demo-description"><n-button :plain="true" size="small" @click="change(3)">修改</n-button> {{ expandValues[3].value }}</div>
      <n-tree
        v-if="baseTreeData.length"
        v-model:expand-values="expandValues[3].value"
        :tree-data="baseTreeData"
        :max-height="300"
        :is-default-expand-parent="false"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';

const baseTreeData = ref([]);
const expandValues = [
  ref(['disciplines', 'navigation']),
  ref(['disciplines', 'navigation']),
  ref(['disciplines', 'navigation']),
  ref(['disciplines', 'navigation']),
];

function change(index: number) {
  expandValues[index].value = ['basic', 'form'];
}


onMounted(() => {
  fetch('https://static.nio.com/fx-static/lego/clrk8znpi000109bebmtiggbz/tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
