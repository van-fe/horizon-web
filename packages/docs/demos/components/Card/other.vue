<template>
  <section class="card-other-demo">
    <h-grid :cols="{ xs: 1, md: 2 }" :gap="16">
      <h-grid-item>
        <h-card
          draggable="true"
          :class="[
            'card-other-demo__draggable',
            { 'card-other-demo__draggable--active': dragging },
          ]"
          title="Prioritize accessibility QA"
          @dragstart="handleDragStart"
          @dragend="handleDragEnd"
        >
          Move this planning card into a different priority lane while keeping the content readable.
        </h-card>
      </h-grid-item>
      <h-grid-item>
        <h-card class="card-other-demo__hover" title="Release health">
          Hover emphasis can identify a selectable card without changing its layout or content
          hierarchy.
        </h-card>
      </h-grid-item>
    </h-grid>
    <p class="card-other-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dragging = ref(false);
const status = ref('Ready for interaction');

function handleDragStart() {
  dragging.value = true;
  status.value = 'Dragging “Prioritize accessibility QA”';
}

function handleDragEnd() {
  dragging.value = false;
  status.value = 'Card dropped';
}
</script>

<style scoped>
.card-other-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.card-other-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.card-other-demo__draggable {
  cursor: grab;
  transition: opacity 160ms ease;
}

.card-other-demo__draggable:active,
.card-other-demo__draggable--active {
  cursor: grabbing;
}

.card-other-demo__draggable--active {
  opacity: 0.58;
}

.card-other-demo__hover {
  transition:
    box-shadow 160ms ease,
    transform 160ms ease;
}

.card-other-demo__hover:hover {
  box-shadow: var(--h-shadow-basic);
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .card-other-demo__draggable,
  .card-other-demo__hover {
    transition: none;
  }
}
</style>
