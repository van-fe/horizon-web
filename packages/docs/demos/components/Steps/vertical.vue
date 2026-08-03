<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <h-steps direction="vertical" :model-value="1">
        <h-step title="Succeeded" description="This is a description." />
        <h-step title="Processing" description="This is a description." />
        <h-step title="Future step" description="This is a description." />
      </h-steps>
    </h-grid-item>
    <h-grid-item :span="8">
      <h-steps direction="vertical" size="small" :model-value="1">
        <h-step title="Succeeded" description="Here is a paragraph." />
        <h-step title="Processing" description="Here is a paragraph." />
        <h-step title="Future step" description="Here is a paragraph." />
      </h-steps>
    </h-grid-item>
    <h-grid-item :span="8">
      <h-steps :progress-dot="true" :model-value="1" direction="vertical" status="error">
        <h-step title="Succeeded" description="Here is a paragraph. Here is a paragraph." />
        <h-step title="Succeeded" description="Here is a paragraph. Here is a paragraph." />
        <h-step title="Processing" description="Here is a paragraph. Here is a paragraph." />
        <h-step title="Future step" description="Here is a paragraph." />
        <h-step title="Future step" description="Here is a paragraph. Here is a paragraph." />
      </h-steps>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
</script>
