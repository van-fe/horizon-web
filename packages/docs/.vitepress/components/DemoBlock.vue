<script setup lang="ts">
import { ref, useSlots, watch, shallowRef, defineAsyncComponent } from 'vue';
import { $message } from '@aurora/horizon-web';
import CodeEditor from './CodeEditor.vue';

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: '',
  }
});

const code = ref(props.source);
const visible = ref(false);
const slots = useSlots();

// 动态导入组件
const DemoComponent = shallowRef<any>(null);

if (props.path) {
  // 使用动态导入，路径已经包含了 demos/ 前缀
  // VitePress 会自动处理这些导入
  DemoComponent.value = defineAsyncComponent(() => import(/* @vite-ignore */ `/${props.path}`));
}

watch(() => props.source, val => {
  code.value = val;
});

function copyCode() {
  navigator.clipboard.writeText(unescape(props.source));
  $message.success('success');
}

function toggleCode() {
  visible.value = !visible.value;
}
</script>

<template>
  <div class="demo-block">
    <div class="preview">
      <component v-if="DemoComponent" :is="DemoComponent" />
      <slot name="source" />
    </div>
    <div class="tools">
      <h-space :size="8">
        <h-button v-tooltip="'复制代码'" size="mini" icon="copy" :icon-size="14" :text="true" type="normal" @click="copyCode" />
        <h-button v-tooltip="'查看/编辑代码'" size="mini" icon="code" :icon-size="14" :text="true" type="normal" @click="toggleCode" />
      </h-space>
    </div>
    <h-transition name="collapse">
      <div v-if="visible">
        <code-editor v-model:code="code" />
      </div>
    </h-transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@aurora/horizon-web/es/styles/mixins";

.demo-block {
  border: 1px solid mixins.css-variable('border-default');
  padding: mixins.css-variable('spacing-3');
  border-radius: mixins.css-variable('radius-m');
  margin: mixins.css-variable('spacing-5') 0;

  .tools {
    text-align: right;
    margin-top: mixins.css-variable('spacing-3');
  }
}
</style>