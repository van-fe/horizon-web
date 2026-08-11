<template>
  <h-button v-popconfirm @click="del">Delete</h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@aurora/horizon-web-vue';
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
