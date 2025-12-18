<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
        <n-radio label="large" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="inputStyle">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="emphasize" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="disabled">
      <n-radio-group v-model="disabled">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-tree-select
        v-model="value"
        :tree-data="baseTreeData"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :to-body="false"
        @focus="onFocus"
        @blur="onBlur"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-tree-select
        v-model="values"
        :tree-data="baseTreeData"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :multiple="true"
        :to-body="false"
        @focus="onFocus"
        @blur="onBlur"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const value = ref('feedback');
const values = ref<string[]>([]);

const size = ref('medium');
const inputStyle = ref('normal');
const disabled = ref(false);
const baseTreeData = ref([]);

function onFocus() {
  console.log('focus');
}

function onBlur() {
  console.log('blur');
}

onMounted(() => {
  fetch('https://static.nio.com/fx-static/horizon-web/clrk8znpi000109bebmtiggbz/tree-data.json')
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });

  values.value.push('disciplines', 'feedback');
});
</script>

<style scoped>
</style>
