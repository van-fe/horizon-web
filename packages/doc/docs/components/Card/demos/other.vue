<template>
  <div class="flex">
    <h-card
      draggable="true"
      :class="[
        'drag',
        'hover',
        {
          dragging: dragging,
        },
      ]"
      title="可拖拽"
      radius="small"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      {{ text }}
    </h-card>
    <h-card
        draggable="true"
        class='hover'
        title="悬浮阴影"
        radius="small"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
    >
      {{ text }}
    </h-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = '这是一段很长很长很长很长很长很长很长很长很长很';
const dragging = ref(false);
const handleDragStart = () => {
  dragging.value = true;
};

const handleDragEnd = () => {
  dragging.value = false;
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  column-gap: 20px;
}
.drag {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.dragging {
  opacity: 0.5; // 或其他你想要的样式
  cursor: grabbing!important;
}
.hover{
  &:hover{
    transition: .3s ease-ih-out;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.06), 0px 5px 12px 4px rgba(0, 0, 0, 0.04);
  }
}
</style>
