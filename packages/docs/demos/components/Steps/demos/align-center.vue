<template>
  <div>
    <n-steps :current="1" label-placement="vertical" status="error">
      <n-step title="Succeeded" description="Here is a paragraph" />
      <n-step title="Processing" description="Here is a paragraph" />
      <n-step title="Future step" description="Here is a paragraph" />
    </n-steps>
    <br />
    <br />
    <n-steps progress-dot label-placement="vertical" :current="3" status="error">
      <n-step title="Succeeded" description="Here is a paragraph" />
      <n-step title="Succeeded" description="Here is a paragraph" />
      <n-step title="Processing" description="Here is a paragraph" />
      <n-step title="Future step" description="Here is a paragraph" />
      <n-step title="Future step" description="Here is a paragraph" />
    </n-steps>
  </div>
</template>
