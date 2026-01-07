<template>
  <h-space>
    <h-button type="normal" @click="open1">使用 HTML</h-button>
    <h-button type="normal" @click="open2">使用 VNode</h-button>
    <h-button type="normal" @click="open3">动态更新内容</h-button>
  </h-space>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: 'Use HTML',
        useHTML: true,
        content:
          '<strong>这是一段内容，可以<i>随意</i>编辑，这是一段内容，可以<i>随意</i>编辑，这是一段内容，可以<i>随意</i>编辑。</strong>',
      });
    };
    const open2 = () => {
      $notify({
        title: 'VNode',
        content: h('p', null, [
          h(
            'div',
            null,
            '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
          ),
        ]),
      });
    };
    const open3 = () => {
      const count = ref(1);
      setInterval(() => {
        count.value++;
      }, 1000);
      const options = {
        title: '动态更新content',
        content() {
          return h('p', null, [h('div', null, count.value)]);
        },
      };
      $notify(options);
    };
    return {
      open1,
      open2,
      open3,
    };
  },
});
</script>