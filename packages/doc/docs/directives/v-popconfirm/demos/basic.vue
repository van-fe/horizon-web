<template>
  <n-button v-popconfirm type="normal" @click="del">点击确认</n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@nio-fe/lego';
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
