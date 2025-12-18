<template>
  <n-space>
    <n-button
      v-for="item in types"
      :key="item.type"
      v-popconfirm="{ type: item.type }"
      type="normal"
      @click="del"
    >
      {{ item.text }}
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@nio-fe/lego';
export default defineComponent({
  setup() {
    const types = [
      {
        type: 'none',
        text: '无图标',
      },
      {
        type: 'info',
        text: '通知',
      },
      {
        type: 'success',
        text: '成功',
      },
      {
        type: 'warning',
        text: '警告',
      },
      {
        type: 'error',
        text: '错误',
      },
    ];
    return {
      types,
      del: () => {
        $message('Action!');
      },
    };
  },
});
</script>
