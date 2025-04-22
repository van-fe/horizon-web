<template>
  <n-steps :current="1" size="small" status="error">
    <n-step title="Succeeded" />
    <n-step title="Processing" />
    <n-step title="Future step" />
  </n-steps>
</template>
