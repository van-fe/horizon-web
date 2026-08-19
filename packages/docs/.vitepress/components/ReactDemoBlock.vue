<script setup lang="ts">
import type { ComponentType } from 'react';
import { createElement } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue';
import { $message } from '@aurora/horizon-vue';

const props = defineProps({
  source: { type: String, required: true },
  path: { type: String, required: true },
  locale: {
    type: String,
    default: '',
    validator: (value: string) => !value || value === 'zh' || value === 'en',
  },
});

const host = ref<HTMLElement>();
const visible = ref(false);
const loading = ref(true);
const error = ref('');
const sourceId = useId();
let reactRoot: Root | undefined;

const demoModules = import.meta.glob('../../demos/react/**/*.tsx');
const moduleKey = `../../${props.path}`;
const labels = computed(() =>
  props.locale === 'en'
    ? {
        demo: 'React component demo',
        copy: 'Copy code',
        hide: 'Hide source',
        show: 'View source',
        loading: 'Loading React demo…',
      }
    : {
        demo: 'React 组件示例',
        copy: '复制代码',
        hide: '收起源码',
        show: '查看源码',
        loading: '正在加载 React 示例…',
      },
);

onMounted(async () => {
  const loader = demoModules[moduleKey];
  if (!loader || !host.value) {
    error.value = `React demo module not found: ${props.path}`;
    loading.value = false;
    return;
  }

  try {
    const module = (await loader()) as { default: ComponentType<{ locale: 'en' | 'zh' }> };
    reactRoot = createRoot(host.value);
    reactRoot.render(
      createElement(module.default, { locale: props.locale === 'en' ? 'en' : 'zh' }),
    );
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : String(reason);
  } finally {
    loading.value = false;
  }
});

onBeforeUnmount(() => reactRoot?.unmount());

async function copyCode() {
  await navigator.clipboard.writeText(props.source);
  $message.success(props.locale === 'en' ? 'Copied' : '已复制');
}
</script>

<template>
  <section class="react-component-demo" :aria-label="labels.demo">
    <div class="react-component-demo__preview">
      <div ref="host" />
      <p v-if="loading" class="react-component-demo__status" role="status">
        {{ labels.loading }}
      </p>
      <p v-else-if="error" class="react-component-demo__status is-error" role="alert">
        {{ error }}
      </p>
    </div>
    <div class="react-component-demo__tools">
      <h-button
        :aria-label="labels.copy"
        size="small"
        icon="copy"
        :icon-size="14"
        :text="true"
        type="normal"
        @click="copyCode"
      />
      <h-button
        :aria-controls="sourceId"
        :aria-expanded="visible"
        :aria-label="visible ? labels.hide : labels.show"
        :active="visible"
        size="small"
        icon="code"
        :icon-size="14"
        :text="true"
        type="normal"
        @click="visible = !visible"
      />
    </div>
    <div v-if="visible" :id="sourceId" class="react-component-demo__source">
      <pre><code>{{ source }}</code></pre>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../../../horizon-vue/src/styles/mixins';

.react-component-demo {
  overflow: hidden;
  border: 1px solid mixins.css-variable('border-default');
  margin: mixins.css-variable('spacing-5') 0;
  border-radius: mixins.css-variable('radius-m');
  background: mixins.css-variable('bg-default');

  &__preview {
    min-height: 112px;
    overflow-x: auto;
    padding: mixins.css-variable('spacing-7');
    box-sizing: border-box;
  }

  &__tools {
    display: flex;
    justify-content: flex-end;
    gap: mixins.css-variable('spacing-1');
    border-top: 1px solid mixins.css-variable('border-default');
    padding: mixins.css-variable('spacing-2') mixins.css-variable('spacing-4');
    background: mixins.css-variable('bg-secondary');
  }

  &__status {
    margin: 0;
    color: mixins.css-variable('text-secondary');

    &.is-error {
      color: mixins.css-variable('text-error');
    }
  }

  &__source {
    overflow: auto;
    border-top: 1px solid mixins.css-variable('border-default');
    padding: mixins.css-variable('spacing-4');
    background: mixins.css-variable('bg-secondary');

    pre {
      margin: 0;
    }
  }
}

@media (max-width: 640px) {
  .react-component-demo__preview {
    min-height: 96px;
    padding: mixins.css-variable('spacing-5');
  }
}
</style>
