<script setup lang="ts">
import { computed, defineAsyncComponent, ref, toRef, useId } from 'vue';
import { $message } from '@aurora/horizon-web';
import { useDemoSource } from './useDemoSource';
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
  locale: {
    type: String,
    default: '',
    validator: (value: string) => !value || value === 'zh' || value === 'en',
  },
});

const visible = ref(false);
const editorId = useId();

// Keep demo imports inside Vite's module graph. Using a runtime absolute URL
// (`import('/demos/...')`) works in dev but cannot be resolved during SSR.
const demoModules = import.meta.glob('../../**/*.vue');

const moduleKey = `../../${props.path}`;
const loader = props.path ? demoModules[moduleKey] : undefined;
const { component, renderKey, compiling, error, compile, loadOriginal } = useLiveDemo(
  props.path,
  loader,
);
const { code, reset } = useDemoSource({
  source: toRef(props, 'source'),
  compile,
  loadOriginal,
});
const isEnglish = computed(() => {
  if (props.locale) return props.locale === 'en';
  return typeof location !== 'undefined' && location.pathname.startsWith('/en/');
});
const labels = computed(() =>
  isEnglish.value
    ? {
        demo: 'Component demo',
        copy: 'Copy code',
        edit: 'View/edit code',
        closeEditor: 'Close code editor',
        refresh: 'Refresh demo',
        compiling: 'Compiling…',
        compileError: 'Compilation failed — preview kept',
        editorHint:
          'Changes compile automatically. The last successful preview stays visible on errors.',
      }
    : {
        demo: '组件示例',
        copy: '复制代码',
        edit: '查看/编辑代码',
        closeEditor: '关闭代码编辑器',
        refresh: '刷新 Demo',
        compiling: '编译中…',
        compileError: '编译失败，已保留上次成功的预览',
        editorHint: '修改后将自动编译；编译失败时会保留上次成功的预览。',
      },
);
async function copyCode() {
  await navigator.clipboard.writeText(code.value);
  $message.success(isEnglish.value ? 'Copied' : '已复制');
}

function toggleCode() {
  visible.value = !visible.value;
}
</script>

<template>
  <section class="component-demo" :aria-label="labels.demo">
    <div class="preview component-demo__preview">
      <component v-if="component" :is="component" :key="renderKey" />
      <slot name="source" />
    </div>
    <div class="component-demo__tools">
      <span
        class="component-demo__status"
        :class="{ 'is-error': error }"
        :title="error || undefined"
        aria-live="polite"
      >
        {{ compiling ? labels.compiling : error ? labels.compileError : '' }}
      </span>
      <div class="component-demo__actions">
        <h-button
          v-tooltip="labels.refresh"
          :aria-label="labels.refresh"
          size="small"
          icon="refresh"
          :icon-size="14"
          :text="true"
          type="normal"
          @click="reset"
        />
        <h-button
          v-tooltip="labels.copy"
          :aria-label="labels.copy"
          size="small"
          icon="copy"
          :icon-size="14"
          :text="true"
          type="normal"
          @click="copyCode"
        />
        <h-button
          v-tooltip="visible ? labels.closeEditor : labels.edit"
          :aria-label="visible ? labels.closeEditor : labels.edit"
          :aria-controls="editorId"
          :aria-expanded="visible"
          :active="visible"
          size="small"
          icon="code"
          :icon-size="14"
          :text="true"
          type="normal"
          @click="toggleCode"
        />
      </div>
    </div>
    <h-transition name="collapse">
      <section
        v-if="visible"
        :id="editorId"
        class="component-demo__editor"
        :aria-label="labels.edit"
      >
        <code-editor v-model:code="code" />
        <div
          class="component-demo__diagnostics"
          :class="{ 'is-error': error }"
          :role="error ? 'alert' : 'status'"
          aria-live="polite"
        >
          {{ error || (compiling ? labels.compiling : labels.editorHint) }}
        </div>
      </section>
    </h-transition>
  </section>
</template>

<style lang="scss" scoped>
@use '../../../horizon-web/src/styles/mixins';

.component-demo {
  overflow: hidden;
  border: 1px solid mixins.css-variable('border-default');
  margin: mixins.css-variable('spacing-5') 0;
  border-radius: mixins.css-variable('radius-m');
  background: mixins.css-variable('bg-default');
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: mixins.css-variable('border-brand-default');
  }

  &__tools,
  &__actions {
    display: flex;
    align-items: center;
  }

  &__tools {
    justify-content: space-between;
    gap: mixins.css-variable('spacing-4');
    border-top: 1px solid mixins.css-variable('border-default');
    padding: mixins.css-variable('spacing-2') mixins.css-variable('spacing-4');
    background: mixins.css-variable('bg-secondary');
  }

  &__actions {
    gap: mixins.css-variable('spacing-1');
  }

  &__status {
    flex: 1;
    min-width: 0;
    min-height: 20px;
    overflow: hidden;
    color: mixins.css-variable('text-secondary');
    font-size: mixins.css-variable('text-sm');
    text-overflow: ellipsis;
    white-space: nowrap;

    &.is-error {
      color: mixins.css-variable('text-error');
    }
  }

  &__preview {
    min-height: 112px;
    overflow-x: auto;
    padding: mixins.css-variable('spacing-7');
    box-sizing: border-box;
    overscroll-behavior-inline: contain;
  }

  &__diagnostics {
    height: 72px;
    overflow: auto;
    border-top: 1px solid mixins.css-variable('border-default');
    padding: mixins.css-variable('spacing-3') mixins.css-variable('spacing-4');
    box-sizing: border-box;
    background: mixins.css-variable('bg-secondary');
    font-family: monospace;
    font-size: 12px;
    white-space: pre-wrap;

    &.is-error {
      color: mixins.css-variable('text-error');
    }
  }

  &__editor {
    border-top: 1px solid mixins.css-variable('border-default');
    background: mixins.css-variable('bg-secondary');
  }
}

@media (hover: hover) {
  .component-demo:hover {
    border-color: mixins.css-variable('border-hover');
  }
}

@media (max-width: 640px) {
  .component-demo {
    &__preview {
      min-height: 96px;
      padding: mixins.css-variable('spacing-5');
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .component-demo {
    transition: none;
  }
}
</style>
