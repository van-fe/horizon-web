<template>
  <h-button class="mr-2" @click="showConfirm()">Confirm</h-button>
  <h-button class="mr-2" @click="showConfirm('info')">Info</h-button>
  <h-button class="mr-2" @click="showConfirm('success')">Success</h-button>
  <h-button class="mr-2" @click="showConfirm('warning')">Warning</h-button>
  <h-button class="mr-2" @click="showConfirm('error')">Error</h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $confirm } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const showConfirm = (type?: 'info' | 'success' | 'warning' | 'error') => {
      $confirm('这是一段文本', '提示', {
        type,
      })
        .then(close => {
          console.info('Confirmed!');
          close();
        })
        .catch(() => {
          console.info('Cancelled!');
        });
    };
    return {
      showConfirm,
    };
  },
});
</script>
