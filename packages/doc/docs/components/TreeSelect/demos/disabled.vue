<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="150px">
    <h-form-item label="整体是否禁用">
      <h-switch v-model="disabled" :status="true" />
    </h-form-item>
    <h-form-item label="是否忽视父子关系">
      <h-switch v-model="checkStrictly" :status="true" status-off-text="否" status-oh-text="是" />
    </h-form-item>
    <h-form-item label="父节点点选是否能更改禁用的子节点的状态">
      <h-switch v-model="parentEffectDisabledChild" :status="true" status-off-text="否" status-oh-text="是" />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :multiple="true"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const disabled = ref(false);
const checkStrictly = ref(false);
const parentEffectDisabledChild = ref(false);

const baseTreeData = ref([]);

onMounted(() => {
  fetch('https://static.nio.com/fx-static/horizon-web/clrk9smqz0000096weuvw7ojx/tree-data-disabled.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
