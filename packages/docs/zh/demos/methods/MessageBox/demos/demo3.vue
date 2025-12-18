<template>
  <n-button class="mr-2" @click="showAlert">Alert</n-button>
  <n-button class="mr-2" @click="showConfirm">Confirm</n-button>
  <n-button class="mr-2" @click="showNoClose">No Close</n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $alert, $confirm } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const showAlert = () => {
      $alert('这是一段文本', '提示', {
        iconName: 'light_on',
        iconSize: '22',
        maskClose: true,
        escClose: true,
        okText: '我知道了',
        okButtonProps: {
          type: 'text',
        },
      }).then(() => {
        console.log('OK clicked!');
      });
    };
    const showConfirm = () => {
      $confirm('这是一段文本', '提示', {
        iconName: 'time',
        iconSize: '22',
        maskClose: true,
        escClose: true,
        okText: '确认提交',
        okButtonProps: {
          type: 'primary',
          kind: 'negative',
        },
        cancelText: '返回修改',
        cancelButtonProps: {
          type: 'text',
          kind: 'neutral',
        },
      })
        .then(() => {
          console.log('Confirmed!');
        })
        .catch(() => {
          console.log('Cancelled!');
        });
    };
    const showNoClose = ()=>{
      $alert('这是一段文本', '提示', {
        iconName: 'time',
        iconSize: '22',
        maskClose: true,
        escClose: true,
        okText: '确认提交',
        closeButton: false,
        okButtonProps: {
          type: 'primary',
          kind: 'negative',
        },
        cancelText: '返回修改',
        cancelButtonProps: {
          type: 'text',
          kind: 'neutral',
        },
      })
          .then(() => {
            console.log('Confirmed!');
          })
          .catch(() => {
            console.log('Cancelled!');
          });
    };
    return {
      showAlert,
      showConfirm,
      showNoClose,
    };
  },
});
</script>
