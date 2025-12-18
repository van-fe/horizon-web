<template>
  <ul>
    <li>
      <n-input size="small" v-model="title" placeholder="请输入"></n-input>
    </li>
    <li><n-checkbox v-model="topDivider" label="上分割线" /></li>
    <li><n-checkbox v-model="bottomDivider" label="下分割线" /></li>
    <li><n-checkbox v-model="border" label="边框" /></li>
    <li class="flex">
      <span>圆角：</span>
      <n-radio-group v-if="border" v-model="radius">
        <n-radio label="none" v-model="radius">none</n-radio>
        <n-radio label="small" v-model="radius">small</n-radio>
        <n-radio label="medium" v-model="radius">medium</n-radio>
        <n-radio label="large" v-model="radius">large</n-radio>
      </n-radio-group>
    </li>
  </ul>
  <n-card
      :title="title"
      :top-divider="topDivider"
      :bottom-divider="bottomDivider"
      :radius="radius"
      :border="border"
  >
    {{ text }}
    <template #footer>
      <div class="custom-footer">
        <n-button type="normal" size="small">Default</n-button>
        <n-button size="small">Default</n-button>
      </div>
    </template>
  </n-card>
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
ul{
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
