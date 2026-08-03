<template>
  <ul>
    <li>
      <h-input size="small" v-model="title" placeholder="请输入"></h-input>
    </li>
    <li><h-checkbox v-model="topDivider" label="上分割线" /></li>
    <li><h-checkbox v-model="bottomDivider" label="下分割线" /></li>
    <li><h-checkbox v-model="border" label="边框" /></li>
    <li class="flex">
      <span>圆角：</span>
      <h-radio-group v-if="border" v-model="radius">
        <h-radio value="none" v-model="radius">none</h-radio>
        <h-radio value="small" v-model="radius">small</h-radio>
        <h-radio value="medium" v-model="radius">medium</h-radio>
        <h-radio value="large" v-model="radius">large</h-radio>
      </h-radio-group>
    </li>
  </ul>
  <h-card
    :title="title"
    :top-divider="topDivider"
    :bottom-divider="bottomDivider"
    :radius="radius"
    :border="border"
  >
    {{ text }}
    <template #footer>
      <div class="custom-footer">
        <h-button type="normal" size="small">Default</h-button>
        <h-button size="small">Default</h-button>
      </div>
    </template>
  </h-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('我是标题');
const radius = ref('small');
const topDivider = ref(false);
const bottomDivider = ref(false);
const border = ref(true);
const text =
  '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段长很长很长很长很长很长很的内容文案';
</script>

<style lang="scss" scoped>
.custom-footer {
  display: flex;
  justify-content: flex-end;
}
ul {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
