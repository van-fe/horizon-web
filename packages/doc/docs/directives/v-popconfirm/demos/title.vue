<template>
  <n-button v-popconfirm="'确定要删除吗？'" type="normal" class="mr-2" @click="del">
    直接设置字符串
  </n-button>
  <n-button v-popconfirm="{ title: '确定要删除吗？' }" type="normal" @click="del">
    使用对象设置气泡确认
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    return {
      del: () => {
        $message('Action!');
      },
    };
  },
});
</script>
