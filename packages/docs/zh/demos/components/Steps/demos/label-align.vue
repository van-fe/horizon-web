<template>
  <div>
    <n-form label-position="left" label-vertical-align="middle">
      <n-form-item label="标签布局" style="width: fit-content">
        <n-select v-model="labelAlign">
          <n-option value="center" label="center"></n-option>
          <n-option value="left" label="left"></n-option>
        </n-select>
      </n-form-item>
    </n-form>

    <n-steps :current="1" :label-align="labelAlign" label-placement="vertical" class="my-8">
      <n-step title="Succeeded" description="Here is a paragraph" />
      <n-step title="Processing" description="Here is a paragraph" />
      <n-step title="Future step" description="Here is a paragraph" />
    </n-steps>
    <n-steps :progress-dot="true" :label-align="labelAlign" :current="3">
      <n-step title="Succeeded" description="Here is a paragraph" />
      <n-step title="Succeeded" description="Here is a paragraph" />
      <n-step title="Processing" description="Here is a paragraph" />
      <n-step title="Future step" description="Here is a paragraph" />
      <n-step title="Future step" description="Here is a paragraph" />
    </n-steps>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const labelAlign = ref('left');
</script>
