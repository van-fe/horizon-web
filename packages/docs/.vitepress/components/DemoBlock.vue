<script setup lang="ts">
import { ref, useSlots, watch } from 'vue';
import { $message } from '@aurora/horizon-web';
import CodeEditor from './CodeEditor.vue';

const props = defineProps({
  source: {
    type: String,
    required: true,
  }
});

const code = ref(props.source);

watch(() => props.source, val => {
  code.value = val;
});

const visible = ref(false);

const slots = useSlots();

function playground() {

}

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
    <div class="preview"></div>
    <div class="tools">
      <n-space :size="8">
        <n-button v-tooltip="'演练场'" size="mini" icon="applets" :icon-size="14" :text="true" type="normal" @click="playground" />
        <n-button v-tooltip="'复制代码'" size="mini" icon="copy" :icon-size="14" :text="true" type="normal" @click="copyCode" />
        <n-button v-tooltip="'查看/编辑代码'" size="mini" icon="record" :icon-size="14" :text="true" type="normal" @click="toggleCode" />
      </n-space>
    </div>
    <n-transition name="collapse">
      <div v-if="visible">
        <code-editor v-model:code="code" />
      </div>
    </n-transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@aurora/horizon-web/es/styles/mixins";

.demo-block {
  border: 1px solid mixins.css-variable('border-default');
  padding: mixins.css-variable('spacing-3');
  border-radius: mixins.css-variable('radius-m');

  .tools {
    text-align: right;
  }
}
</style>