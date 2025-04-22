<template>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :to-body="false"
        clearable
        @focus="onFocus"
        @blur="onBlur"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-tree-select
        :tree-data="baseTreeData"
        :filterable="true"
        :max-height="300"
        :multiple="true"
        :to-body="false"
        clearable
        @focus="onFocus"
        @blur="onBlur"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);

function onFocus() {
  console.log('focus');
}

function onBlur() {
  console.log('blur');
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
