<template>
  <n-row>
    <n-col>
      <n-tooltip placement="top">
        <n-button>不允许移入复制</n-button>
        <template #content>只能看到这里的内容，但不能移入复制</template>
      </n-tooltip>
      <n-tooltip placement="top" :enterable="true">
        <n-button>允许移入复制</n-button>
        <template #content>可以复制这里的内容</template>
      </n-tooltip>
      <n-tooltip placement="top" :enterable="true" :click-to-copy="true">
        <n-button>允许移入点击后复制</n-button>
        <template #content>点击后这串文字将会出现在剪切板里</template>
      </n-tooltip>
      <n-tooltip placement="top" :enterable="true" :click-to-copy="true" copy-target="reference">
        <n-button>允许移入点击后复制 <code>reference</code> 的文字</n-button>
        <template #content>点击后复制的不是我，而是 reference 的文字</template>
      </n-tooltip>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
</script>
