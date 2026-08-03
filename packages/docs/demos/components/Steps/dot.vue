<template>
  <h-steps :current="1" :progress-dot="true" status="error">
    <h-step title="Succeeded" description="Here is a paragraph" />
    <h-step title="Processing" description="Here is a paragraph" />
    <h-step title="Future step" description="Here is a paragraph" />
  </h-steps>
</template>
