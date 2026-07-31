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
  },
});

const code = ref(props.source);
const visible = ref(false);
const slots = useSlots();

// Keep demo imports inside Vite's module graph. Using a runtime absolute URL
// (`import('/demos/...')`) works in dev but cannot be resolved during SSR.
const demoModules = import.meta.glob('../../**/*.vue');

// 动态导入组件
const DemoComponent = shallowRef<any>(null);

if (props.path) {
  const moduleKey = `../../${props.path}`;
  const loader = demoModules[moduleKey];
  if (!loader) {
    throw new Error(`Demo module not found: ${props.path}`);
  }
  DemoComponent.value = defineAsyncComponent(loader as any);
}

watch(
  () => props.source,
  val => {
    code.value = val;
  },
);

function copyCode() {
  navigator.clipboard.writeText(unescape(props.source));
  $message.success('success');
}

function toggleCode() {
  visible.value = !visible.value;
}
</script>

<template>
  <div class="component-demo">
    <div class="preview">
      <component v-if="DemoComponent" :is="DemoComponent" />
      <slot name="source" />
    </div>
    <div class="tools">
      <h-space :size="8">
        <h-button
          v-tooltip="'复制代码'"
          size="mini"
          icon="copy"
          :icon-size="14"
          :text="true"
          type="normal"
          @click="copyCode"
        />
        <h-button
          v-tooltip="'查看/编辑代码'"
          size="mini"
          icon="code"
          :icon-size="14"
          :text="true"
          type="normal"
          @click="toggleCode"
        />
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
@use '../../../horizon-web/src/styles/mixins';

.component-demo {
  overflow: hidden;
  border: 1px solid mixins.css-variable('border-default');
  margin: mixins.css-variable('spacing-5') 0;
  border-radius: mixins.css-variable('radius-m');
  background: mixins.css-variable('bg-default');
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: mixins.css-variable('border-hover');
    box-shadow: mixins.css-variable('shadow-down');
  }

  .preview {
    min-height: 96px;
    overflow-x: auto;
    padding: mixins.css-variable('spacing-6');
    box-sizing: border-box;
  }

  .tools {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid mixins.css-variable('border-default');
    padding: mixins.css-variable('spacing-2') mixins.css-variable('spacing-4');
    background: mixins.css-variable('bg-secondary');
  }
}
</style>
