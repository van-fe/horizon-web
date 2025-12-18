<template>
  <n-button v-popconfirm="'确定要删除吗？'" class="mr-2" @click="del">Delete</n-button>
  <n-button v-popconfirm="{ title: '确定要删除吗？' }" @click="del">Delete</n-button>
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
