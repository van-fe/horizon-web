<template>
  <n-space>
    <n-button type="normal" @click="showAlert">Alert</n-button>
    <n-button type="normal" @click="showConfirm">Confirm</n-button>
  </n-space>
</template>

<script setup lang="ts">
import { $alert, $confirm, $message } from '@nio-fe/lego';

const showAlert = () => {
  $alert('这是一段文本', '提示', {
    maskClose: true,
    escClose: true,
    okText: '我知道了',
    okButtonProps: {
      debounceType: 'loading',
      debounceFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            $message.success('finished!');
            resolve(void 0);
          }, 2000);
        });
      },
    },
  }).then(() => {
    console.log('OK clicked!');
  });
};
const showConfirm = () => {
  $confirm('这是一段文本', '提示', {
    maskClose: true,
    escClose: true,
    okText: '确认提交',
    okButtonProps: {
      debounceType: 'loading',
      debounceFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            $message.success('finished!');
            resolve(void 0);
          }, 2000);
        });
      },
    },
    cancelButtonProps: {
      debounceType: 'loading',
      debounceFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            $message.warning('cancel!');
            resolve(void 0);
          }, 2000);
        });
      },
    },
  })
    .then(close => {
      console.log('Confirmed!');
      close();
    })
    .catch(() => {
      console.log('Cancelled!');
    });
};
</script>
