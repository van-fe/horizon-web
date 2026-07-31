<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, ref, watch } from 'vue';
import { $message } from '@aurora/horizon-web';
import { useLiveDemo } from './useLiveDemo';

const CodeEditor = defineAsyncComponent(() => import('./CodeEditor.vue'));

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

// Keep demo imports inside Vite's module graph. Using a runtime absolute URL
// (`import('/demos/...')`) works in dev but cannot be resolved during SSR.
const demoModules = import.meta.glob('../../**/*.vue');

const moduleKey = `../../${props.path}`;
const loader = props.path ? demoModules[moduleKey] : undefined;
const { component, renderKey, compiling, error, compile, refresh, loadOriginal } = useLiveDemo(
  props.path,
  loader,
);
const isEnglish = computed(
  () => typeof location !== 'undefined' && location.pathname.startsWith('/en/'),
);
const labels = computed(() =>
  isEnglish.value
    ? {
        copy: 'Copy code',
        edit: 'View/edit code',
        refresh: 'Refresh demo',
        compiling: 'Compiling…',
      }
    : { copy: '复制代码', edit: '查看/编辑代码', refresh: '刷新 Demo', compiling: '编译中…' },
);
let compileTimer: ReturnType<typeof setTimeout> | undefined;

watch(
  () => props.source,
  val => {
    code.value = val;
    void loadOriginal();
  },
);

watch(code, value => {
  if (value === props.source) return;
  clearTimeout(compileTimer);
  compileTimer = setTimeout(() => void compile(value), 250);
});

onBeforeUnmount(() => clearTimeout(compileTimer));

async function copyCode() {
  await navigator.clipboard.writeText(code.value);
  $message.success(isEnglish.value ? 'Copied' : '已复制');
}

function toggleCode() {
  visible.value = !visible.value;
}
</script>

<template>
  <div class="component-demo">
    <div class="preview">
      <component v-if="component" :is="component" :key="renderKey" />
      <slot name="source" />
    </div>
    <div v-if="error" class="compile-error" role="alert">{{ error }}</div>
    <div class="tools">
      <span class="compile-status" aria-live="polite">{{ compiling ? labels.compiling : '' }}</span>
      <h-space :size="8">
        <h-button
          v-tooltip="labels.refresh"
          :aria-label="labels.refresh"
          size="mini"
          icon="refresh"
          :icon-size="14"
          :text="true"
          type="normal"
          @click="refresh"
        />
        <h-button
          v-tooltip="labels.copy"
          :aria-label="labels.copy"
          size="mini"
          icon="copy"
          :icon-size="14"
          :text="true"
          type="normal"
          @click="copyCode"
        />
        <h-button
          v-tooltip="labels.edit"
          :aria-label="labels.edit"
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
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid mixins.css-variable('border-default');
    padding: mixins.css-variable('spacing-2') mixins.css-variable('spacing-4');
    background: mixins.css-variable('bg-secondary');
  }

  .compile-status {
    min-height: 20px;
    color: mixins.css-variable('text-secondary');
    font-size: 12px;
  }

  .compile-error {
    border-top: 1px solid mixins.css-variable('border-default');
    padding: mixins.css-variable('spacing-3') mixins.css-variable('spacing-4');
    background: mixins.css-variable('bg-secondary');
    color: mixins.css-variable('text-error');
    font-family: monospace;
    font-size: 12px;
    white-space: pre-wrap;
  }
}
</style>
