<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="单选显示单选框">
      <n-switch v-model="showRadio" :status="true" />
    </n-form-item>
    <n-form-item label="多选显示多选框">
      <n-switch v-model="showCheckbox" :status="true" />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选 </div>
      <n-tree
        :tree-data="baseTreeData"
        :show-radio="showRadio"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :tree-data="baseTreeData"
        :show-checkbox="showCheckbox"
        :multiple="true"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const baseTreeData = ref([]);
const showRadio = ref(false);
const showCheckbox = ref(true);

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
