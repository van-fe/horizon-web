<script setup lang="ts">
import { ref } from 'vue';

type ProjectTag = { id: string; label: string };

const tags = ref<ProjectTag[]>([
  { id: 'frontend', label: 'Frontend' },
  { id: 'quality', label: 'Quality' },
  { id: 'design', label: 'Design system' },
]);
const status = ref('Create, edit, or close a tag');
let nextId = 1;

function beforeCreate(label: string) {
  const value = label.trim();
  if (!value || tags.value.some(tag => tag.label.toLowerCase() === value.toLowerCase()))
    return false;
  tags.value.push({ id: `custom-${nextId++}`, label: value });
  return true;
}

function beforeEdit(label: string, _oldValue: string, id: string) {
  const target = tags.value.find(tag => tag.id === id);
  if (!target || !label.trim()) return false;
  target.label = label.trim();
  return true;
}

function beforeClose(id: string) {
  if (tags.value.length <= 2) return false;
  tags.value = tags.value.filter(tag => tag.id !== id);
  return true;
}
</script>

<template>
  <section class="docs-demo">
    <h-tag-group
      use-create
      editable
      :max-tags="6"
      :before-create="beforeCreate"
      :before-edit="beforeEdit"
      :before-close="beforeClose"
      @created="status = `Created ${$event}`"
      @edited="status = 'Tag updated'"
      @closed="status = 'Tag removed'"
    >
      <h-tag v-for="tag in tags" :id="tag.id" :key="tag.id" closable plain :clickable="false">
        {{ tag.label }}
      </h-tag>
    </h-tag-group>
    <p class="docs-demo__status">{{ status }}</p>
  </section>
</template>
