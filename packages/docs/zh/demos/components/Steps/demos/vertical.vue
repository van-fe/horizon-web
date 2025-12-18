<template>
  <n-row>
    <n-col :span="8">
      <n-steps direction="vertical" :model-value="1">
        <n-step title="Succeeded" description="This is a description." />
        <n-step title="Processing" description="This is a description." />
        <n-step title="Future step" description="This is a description." />
      </n-steps>
    </n-col>
    <n-col :span="8">
      <n-steps direction="vertical" size="small" :model-value="1">
        <n-step title="Succeeded" description="Here is a paragraph." />
        <n-step title="Processing" description="Here is a paragraph." />
        <n-step title="Future step" description="Here is a paragraph." />
      </n-steps>
    </n-col>
    <n-col :span="8">
      <n-steps :progress-dot="true" :model-value="1" direction="vertical" status="error">
        <n-step title="Succeeded" description="Here is a paragraph. Here is a paragraph." />
        <n-step title="Succeeded" description="Here is a paragraph. Here is a paragraph." />
        <n-step title="Processing" description="Here is a paragraph. Here is a paragraph." />
        <n-step title="Future step" description="Here is a paragraph." />
        <n-step title="Future step" description="Here is a paragraph. Here is a paragraph." />
      </n-steps>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
</script>
