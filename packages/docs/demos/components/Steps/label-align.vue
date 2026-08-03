<template>
  <div>
    <h-form label-position="left" label-vertical-align="middle">
      <h-form-item label="标签布局" style="width: fit-content">
        <h-select v-model="labelAlign">
          <h-option value="center" label="center"></h-option>
          <h-option value="left" label="left"></h-option>
        </h-select>
      </h-form-item>
    </h-form>

    <h-steps :current="1" :label-align="labelAlign" label-placement="vertical" class="my-8">
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Processing" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
    </h-steps>
    <h-steps :progress-dot="true" :label-align="labelAlign" :current="3">
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Processing" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
    </h-steps>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const labelAlign = ref('left');
</script>
