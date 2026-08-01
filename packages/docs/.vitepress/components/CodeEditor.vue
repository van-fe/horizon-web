<script setup lang="ts">
import { EditorView, basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { getEditorIndentChanges } from './editorIndent';

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
});

const emit = defineEmits({
  'update:code': (value: string) => Object.prototype.toString.call(value) === '[object String]',
});

const domRef = ref<HTMLDivElement | null>(null);
let editor: EditorView | undefined;

onMounted(() => {
  const updateListenerExtension = EditorView.updateListener.of(update => {
    if (update.docChanged) {
      emit('update:code', update.state.doc.toString());
    }
  });
  const indentExtension = EditorView.domEventHandlers({
    keydown(event, view) {
      if (event.key !== 'Tab' || event.altKey || event.ctrlKey || event.metaKey) return false;
      const changes = getEditorIndentChanges(
        view.state.doc.toString(),
        view.state.selection.ranges,
        event.shiftKey,
      );
      if (changes.length) {
        view.dispatch({
          changes,
          userEvent: event.shiftKey ? 'delete.dedent' : 'input.indent',
        });
      }
      return true;
    },
  });

  if (!domRef.value) return;
  editor = new EditorView({
    doc: props.code,
    parent: domRef.value,
    extensions: [basicSetup, html(), indentExtension, updateListenerExtension],
  });
});

watch(
  () => props.code,
  value => {
    if (!editor || value === editor.state.doc.toString()) return;
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: value },
    });
  },
);

onBeforeUnmount(() => {
  editor?.destroy();
});
</script>

<template>
  <div ref="domRef" class="code-editor" />
</template>

<style scoped lang="scss">
.code-editor {
  max-height: 520px;
  overflow: auto;

  :deep(.cm-editor) {
    min-height: 180px;
    font-size: 13px;
  }

  :deep(.cm-gutters) {
    border-color: var(--h-border-default);
    background-color: var(--h-bg-secondary);
    color: var(--h-text-secondary);
  }

  :deep(.cm-focused) {
    outline: 2px solid var(--h-border-focused);
    outline-offset: -2px;
  }
}
</style>
