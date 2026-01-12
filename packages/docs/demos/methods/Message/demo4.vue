<template>
  <h-button :plain="true" @click="openHTML">Use HTML String</h-button>
</template>

<script lang="ts" setup>
import { $message } from '@aurora/horizon-web';

const openHTML = () => {
  $message({
    useHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  });
};
</script>
