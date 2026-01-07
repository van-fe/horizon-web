<template>
  <div>
    <h-steps :current="1" label-placement="vertical" status="error">
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Processing" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
    </h-steps>
    <br />
    <br />
    <h-steps progress-dot label-placement="vertical" :current="3" status="error">
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Succeeded" description="Here is a paragraph" />
      <h-step title="Processing" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
      <h-step title="Future step" description="Here is a paragraph" />
    </h-steps>
  </div>
</template>
