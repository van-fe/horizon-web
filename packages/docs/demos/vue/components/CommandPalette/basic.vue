<script setup lang="ts">
import { ref } from 'vue';

interface DemoCommand {
  id: string;
  label: string;
  description?: string;
  keywords?: string[];
  shortcut?: string;
  disabled?: boolean;
}

const visible = ref(false);
const query = ref('');
const lastCommand = ref('No command executed yet.');
const commands: DemoCommand[] = [
  {
    id: 'open-project',
    label: 'Open project',
    description: 'Jump to a recent project',
    keywords: ['workspace', 'recent'],
    shortcut: '⌘ P',
  },
  {
    id: 'new-page',
    label: 'Create page',
    description: 'Add a blank page to this workspace',
    keywords: ['new', 'document'],
    shortcut: '⌘ N',
  },
  {
    id: 'toggle-theme',
    label: 'Toggle theme',
    description: 'Switch between light and dark appearance',
    keywords: ['dark', 'light', 'appearance'],
  },
  {
    id: 'invite',
    label: 'Invite teammate',
    description: 'Open workspace member settings',
    keywords: ['share', 'member', 'people'],
  },
  {
    id: 'publish',
    label: 'Publish workspace',
    description: 'Disabled until review is complete',
    keywords: ['release'],
    disabled: true,
  },
];

function openPalette() {
  query.value = '';
  visible.value = true;
}

function handleSelect(command: DemoCommand) {
  lastCommand.value = `${command.label} executed.`;
}
</script>

<template>
  <div class="command-palette-demo">
    <h-button class="command-palette-demo__action" @click="openPalette">
      Open palette · ⌘/Ctrl K
    </h-button>
    <p aria-live="polite">
      {{ query ? `Searching for “${query}”` : lastCommand }}
    </p>

    <h-command-palette
      v-model:visible="visible"
      :commands="commands"
      placeholder="Search workspace commands…"
      empty-text="No matching workspace commands"
      @search="query = $event"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>
.command-palette-demo {
  display: grid;
  gap: var(--h-spacing-3);
}

.command-palette-demo__action {
  justify-self: start;
}

.command-palette-demo p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: var(--h-text-sm);
}
</style>
