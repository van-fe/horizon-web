<template>
  <n-steps :current="1" :progress-dot="true" status="error">
    <n-step title="Succeeded" description="Here is a paragraph" />
    <n-step title="Processing" description="Here is a paragraph" />
    <n-step title="Future step" description="Here is a paragraph" />
  </n-steps>
</template>
