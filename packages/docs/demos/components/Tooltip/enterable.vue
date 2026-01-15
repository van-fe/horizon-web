<template>
  <h-row>
    <h-col>
      <h-tooltip placement="top">
        <h-button>不允许移入复制</h-button>
        <template #content>只能看到这里的内容，但不能移入复制</template>
      </h-tooltip>
      <h-tooltip placement="top" :enterable="true">
        <h-button>允许移入复制</h-button>
        <template #content>可以复制这里的内容</template>
      </h-tooltip>
    </h-col>
  </h-row>
  <h-row>
    <h-col>
      <h-tooltip placement="top" :enterable="true" :click-to-copy="true">
        <h-button>允许移入点击后复制</h-button>
        <template #content>点击后这串文字将会出现在剪切板里</template>
      </h-tooltip>
      <h-tooltip placement="top" :enterable="true" :click-to-copy="true" copy-target="reference">
        <h-button>允许移入点击后复制 <code>reference</code> 的文字</h-button>
        <template #content>点击后复制的不是我，而是 reference 的文字</template>
      </h-tooltip>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
</script>
