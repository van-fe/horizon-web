<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
        <h-radio value="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio value="normal" />
        <h-radio value="emphasize" />
        <h-radio value="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">单选</div>
      <h-tree-select
        v-model="value"
        :tree-data="baseTreeData"
        :size="size"
        :input-style="inputStyle"
        :disabled="disabled"
        :to-body="false"
        @focus="onFocus"
        @blur="onBlur"
      />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">多选</div>
      <h-tree-select
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
    </h-grid-item>
  </h-grid>
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
  console.info('focus');
}

function onBlur() {
  console.info('blur');
}

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });

  values.value.push('disciplines', 'feedback');
});
</script>

<style scoped></style>
