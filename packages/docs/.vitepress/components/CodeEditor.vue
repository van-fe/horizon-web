<script setup lang="ts">
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { onMounted, ref } from 'vue';
import debounce from 'lodash/debounce';

const props = defineProps({
  code: {
    type: String,
    default: '',
  }
});

const emit = defineEmits({
  'update:code': (value: string) => Object.prototype.toString.call(value) === '[object String]',
});

const domRef = ref<HTMLDivElement>(null);

const emitChange = debounce((text: string) => emit('update:code', text), 500);

onMounted(() => {
  const updateListenerExtension = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      emitChange(update.state.doc.toString());
    }
  });

  new EditorView({
    doc: props.code,
    parent: domRef.value,
    extensions: [basicSetup, html(), updateListenerExtension]
  });
});
</script>

<template>
  <div ref="domRef"></div>
</template>

<style scoped>

</style>