<template>
  <n-form label-position="left" label-vertical-align="middle" label-width="150px">
    <n-form-item label="整体是否禁用">
      <n-switch v-model="disabled" :status="true" />
    </n-form-item>
    <n-form-item label="是否忽视父子关系">
      <n-switch v-model="checkStrictly" :status="true" status-off-text="否" status-on-text="是" />
    </n-form-item>
    <n-form-item label="父节点点选是否能更改禁用的子节点的状态">
      <n-switch v-model="parentEffectDisabledChild" :status="true" status-off-text="否" status-on-text="是" />
    </n-form-item>
    <n-form-item label="是否强调">
      <n-switch v-model="stress" :status="true" status-off-text="否" status-on-text="是" />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="12">
      <div class="demo-title">单选</div>
      <n-tree
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :stress="stress"
      />
    </n-col>
    <n-col :span="12">
      <div class="demo-title">多选</div>
      <n-tree
        :tree-data="baseTreeData"
        :disabled="disabled"
        :check-strictly="checkStrictly"
        :parent-effect-disabled-child="parentEffectDisabledChild"
        :multiple="true"
        :stress="stress"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const disabled = ref(false);
const checkStrictly = ref(false);
const parentEffectDisabledChild = ref(false);
const stress = ref(false);

const baseTreeData = ref([]);

onMounted(() => {
  fetch('https://static.nio.com/fx-static/lego/clrk9smqz0000096weuvw7ojx/tree-data-disabled.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});
</script>

<style scoped>
</style>
