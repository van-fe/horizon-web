<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import Prism from 'prismjs';

const slots = useSlots();

const props = defineProps({
  ext: {
    type: String,
    required: true,
  },
});

const grammar = computed(() => {
  switch (props.ext?.replace(/^\./, '')) {
    case 'ts':
    case 'tsx':
      return Prism.languages.typescript;
    case 'scss':
      return Prism.languages.scss;
    case 'css':
      return Prism.languages.css;
    case 'json':
      return Prism.languages.json;
    case 'html':
    default:
      return Prism.languages.xml;
  }
});

const language = computed(() => {
  switch (props.ext?.replace(/^\./, '')) {
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'scss':
      return 'scss';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'html':
    default:
      return 'xml';
  }
});

const decode = (str: string) => {
  return str.replace(/\\{/g, '{').replace(/\\}/g, '}').replace(/\s/g, ' ').replace(/\\n/g, '\n');
};

const highlightedCode = Prism.highlight(decode(slots.highlight?.()[0].children as string), grammar.value, language.value);
</script>

<template>
  <h-collapse :filled="true" size="small" style="margin-bottom: 16px;">
    <h-collapse-item name="main" title="展开查看" class="code-area">
      <pre><code v-html="highlightedCode" /></pre>
    </h-collapse-item>
  </h-collapse>
</template>

<style lang="scss" scoped>
@use '@aurora/horizon-web/es/styles/mixins';

.code-area {
  :deep(#{mixins.block-name('collapse-item__content')}) {
    padding-left: 0;
    padding-right: 0;

    code {
      color: mixins.css-variable('text-primary');
    }

    pre {
      background: mixins.css-variable('bg-secondary');
      padding: mixins.css-variable('spacing-5');
    }
  }
}
</style>
