<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="emphasize" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
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
    </h-col>
    <h-col :span="6">
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
    </h-col>
  </h-row>
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
