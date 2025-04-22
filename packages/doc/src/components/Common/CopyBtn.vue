<template>
  <n-button v-tooltip="tooltip" :icon="copyIcon" size="small" type="normal" :text="true" @click="copy" />
</template>

<script lang="tsx">
import { defineComponent } from 'vue';
import { IconCopy } from '@nio-fe/icon';
import { $message } from '@nio-fe/lego';

export default defineComponent({
  name: 'CopyBtn',
  props: {
    text: {
      type: String,
      required: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: 'Copy variable'
    }
  },
  setup(props) {
    return {
      copyIcon: <IconCopy color={[props.dark ? '#FFF' : 'var(--n-text-primary)']} size="14" />,
      copy: () => {
        if (props.text) {
          navigator.clipboard.writeText(props.text);
          $message.success(`Copy success: ${props.text}`);
        }
      },
    };
  },
});
</script>
