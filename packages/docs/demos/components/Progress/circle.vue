<template>
  <div class="demo-progress">
    <h-progress type="circle" :percentage="60" size="xs" />
    <h-progress type="circle" :percentage="25" size="s" />
    <h-progress type="circle" :percentage="60" size="m" />
    <h-progress type="circle" :percentage="70" size="l" />
    <h-progress type="circle" :percentage="85" size="s" status="success" />
    <h-progress type="circle" :percentage="70" size="m" status="exception" />
    <h-progress type="circle" :percentage="70" size="l" status="warning" />
  </div>
</template>
<style scoped>
.demo-progress {
    display: flex;
    align-items: center;
}
.demo-progress .h-progress--line {
    margin-bottom: 15px;
    width: 350px;
}

.demo-progress .h-progress-circle {
    margin-right: 15px;
}
</style>
