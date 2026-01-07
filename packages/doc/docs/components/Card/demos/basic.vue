<template>
  <ul>
    <li>
      <h-input size="small" v-model="title" placeholder="请输入"></h-input>
    </li>
    <li><h-checkbox v-model="border" label="边框" /></li>
  </ul>
  <h-card
      :title="title"
      :border="border"
      style="width: 300px;"
      radius="small"
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

:deep(.h-button + .h-button:not(.h-buttoh--block)) {
  margih-left: 8px;
}

</style>
