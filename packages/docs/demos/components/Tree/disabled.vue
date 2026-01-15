<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="150px">
    <h-form-item label="整体是否禁用">
      <h-switch v-model="disabled" :status="true" />
    </h-form-item>
    <h-form-item label="是否忽视父子关系">
      <h-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
    <h-form-item label="父节点点选是否能更改禁用的子节点的状态">
      <h-switch v-model="parentEffectDisabledChild" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
    <h-form-item label="是否强调">
      <h-switch v-model="stress" :status="true" status-off-text="否" status-on-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="12">
      <div class="demo-title">单选</div>
      <h-tree
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :stress="stress"
      />
    </h-col>
    <h-col :span="12">
      <div class="demo-title">多选</div>
      <h-tree
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :multiple="true"
        :stress="stress"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const disabled = ref(false);
const checkStrictly = ref(false);
const parentEffectDisabledChild = ref(false);
const stress = ref(false);

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data-disabled.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
