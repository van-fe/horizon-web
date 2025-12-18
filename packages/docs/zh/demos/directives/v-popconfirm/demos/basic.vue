<template>
  <n-button v-popconfirm @click="del">Delete</n-button>
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
