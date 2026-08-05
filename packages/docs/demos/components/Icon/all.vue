<template>
  <div class="icon-gallery-demo">
    <p
      class="icon-gallery-demo__feedback"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ feedback }}
    </p>
    <ul class="icon-gallery">
      <li
        v-for="icon in selectedIcons"
        :key="icon.name"
        class="icon-gallery__item"
        :class="{
          'is-copied': copyResult?.name === icon.name && copyResult.status === 'success',
        }"
      >
        <span class="icon-gallery__visual" aria-hidden="true">
          <component :is="icon.component" :size="28" />
        </span>
        <h-button
          class="icon-gallery__name-button"
          type="normal"
          link
          size="small"
          :active="copyResult?.name === icon.name && copyResult.status === 'success'"
          :aria-label="labels.copyLabel(icon.name)"
          @click="copyUsageCode(icon.name)"
        >
          <span class="icon-gallery__name">{{ icon.name }}</span>
        </h-button>
        <span
          class="icon-gallery__copy-state"
          :class="{
            'is-success': copyResult?.name === icon.name && copyResult.status === 'success',
            'is-error': copyResult?.name === icon.name && copyResult.status === 'error',
          }"
          aria-hidden="true"
        >
          {{
            copyResult?.name === icon.name
              ? copyResult.status === 'success'
                ? labels.copied
                : labels.copyFailed
              : ''
          }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, type Component } from 'vue';
import * as AuroraIcons from '@aurora/icon';

type IconGroupKey =
  | 'navigation'
  | 'actions'
  | 'status'
  | 'people'
  | 'files'
  | 'data'
  | 'media'
  | 'vehicles'
  | 'business'
  | 'brands'
  | 'general';

interface IconEntry {
  name: string;
  component: Component;
}

interface CategoryDefinition {
  key: IconGroupKey;
  pattern?: RegExp;
}

const props = withDefaults(
  defineProps<{
    group: IconGroupKey;
    locale?: 'zh' | 'en';
  }>(),
  { locale: 'zh' },
);

const labels = computed(() =>
  props.locale === 'en'
    ? {
        copied: 'Copied',
        copyFailed: 'Copy failed',
        copyLabel: (name: string) => `Copy the import code for ${name}`,
        success: (name: string) => `Copied the import code for ${name}.`,
        failure: (name: string) => `Could not copy the import code for ${name}.`,
      }
    : {
        copied: '已复制',
        copyFailed: '复制失败',
        copyLabel: (name: string) => `复制 ${name} 的导入代码`,
        success: (name: string) => `已复制 ${name} 的导入代码。`,
        failure: (name: string) => `无法复制 ${name} 的导入代码。`,
      },
);

const categoryDefinitions: CategoryDefinition[] = [
  {
    key: 'navigation',
    pattern:
      /(Arrow|Triangle|Back|Forward|Previous|Next|Left|Right|Up|Down|Expand|Collapse|Fold|Unfold|Swap|Sort|Jump|Navigation|Direction|Move|Drag|Top|End)/,
  },
  {
    key: 'actions',
    pattern:
      /(Add|Remove|Delete|Rubbish|Edit|Copy|Paste|Cut|Save|Upload|Download|Share|Search|Filter|Refresh|Synchronize|Undo|Redo|Select|Check|Close|Clear|Reduce|Zoom|Fullscreen|Minimize|Maximize|Lock|Unlock|Freeze|Print|Scan|Repair|Settings|Configuration|Adjust|Align|Indentation|Insert)/,
  },
  {
    key: 'status',
    pattern:
      /(Success|Error|Fail|Warning|Info|Question|Help|Notice|Notification|Alarm|Tip|Loading|Complete|Pending|Unknown|Urgent|Hot|Like|Star|Recommend|Feedback|Finish)/,
  },
  {
    key: 'people',
    pattern:
      /(User|Person|Member|Friend|Staff|Owner|Group|Team|Customer|Contact|Chat|Message|Comment|Phone|Mail|Email|Send|Reply|Mention|AddressBook|Microphone|Voice)/,
  },
  {
    key: 'files',
    pattern:
      /(File|Folder|Document|Page|Word|Excel|Pdf|Ppt|Zip|Image|Picture|Text|Font|Paragraph|List|Table|Calendar|Bookmark|Catalogue|Attachment|Signature|Note|Thumbnail)/,
  },
  {
    key: 'data',
    pattern:
      /(Chart|Data|Database|Code|Program|Function|Array|String|Boolean|Bigint|Flowchart|Debug|Plugin|Api|Rule|Formula|Conditional|Variable|Column|Row|Tree|Node|Lookup|Component|Layout)/,
  },
  {
    key: 'media',
    pattern:
      /(Play|Pause|Stop|Volume|Music|Audio|Video|Camera|Screen|Monitor|Device|Mobile|Computer|Keyboard|Mouse|Bluetooth|Wifi|Qr|Headset|Speaker)/,
  },
  {
    key: 'vehicles',
    pattern:
      /(Car|Vehicle|Drive|Pilot|Tire|Charging|Battery|Door|Seat|Steering|AirConditioning|Location|Map|Pin|Road|Travel)/,
  },
  {
    key: 'business',
    pattern:
      /(Order|Workorder|Ticket|Service|Financial|Creditcard|Goods|Inventory|Delivery|Buying|Demand|Store|Shop|Admin|Authority|Security|Organization|Management|Application|Home|House)/,
  },
  {
    key: 'brands',
    pattern: /(Logo|Nio|Onvo|Firefly|Feishu|Tonglian|Nomi|Rsc|Scr|Urs|Occ|Pos|Fy)/,
  },
  { key: 'general' },
];

const icons = Object.entries(AuroraIcons)
  .filter(([name]) => name.startsWith('Icon') && name !== 'Icon')
  .map(([name, component]) => ({ name, component: component as Component }))
  .sort((left, right) => left.name.localeCompare(right.name));

const groupedIcons = new Map(categoryDefinitions.map(category => [category.key, [] as IconEntry[]]));
icons.forEach(icon => {
  const category =
    categoryDefinitions.find(definition => definition.pattern?.test(icon.name)) ??
    categoryDefinitions.at(-1)!;
  groupedIcons.get(category.key)!.push(icon);
});

const selectedIcons = computed(() => groupedIcons.get(props.group) ?? []);

const feedback = ref('');
const copyResult = ref<{ name: string; status: 'success' | 'error' }>();

function getUsageCode(name: string) {
  return `import { ${name} } from '@aurora/icon';`;
}

function copyWithFallback(value: string) {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}

async function copyUsageCode(name: string) {
  feedback.value = '';
  await nextTick();

  let copied = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(getUsageCode(name));
      copied = true;
    } else {
      copied = copyWithFallback(getUsageCode(name));
    }
  } catch {
    copied = false;
  }

  copyResult.value = { name, status: copied ? 'success' : 'error' };
  feedback.value = copied ? labels.value.success(name) : labels.value.failure(name);
}
</script>

<style scoped>
.icon-gallery-demo {
  min-width: 0;
}

.icon-gallery-demo__feedback {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.icon-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 124px), 1fr));
  gap: var(--h-spacing-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.icon-gallery__item,
.icon-gallery__item + .icon-gallery__item {
  display: grid;
  align-items: center;
  min-width: 0;
  height: 120px;
  grid-template-rows: 30px 44px 16px;
  gap: var(--h-spacing-1);
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
  margin: 0;
  padding: var(--h-spacing-2);
  color: var(--h-text-primary);
  background: var(--h-bg-default);
  box-sizing: border-box;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.icon-gallery__item.is-copied {
  border-color: var(--h-border-brand-default);
}

.icon-gallery__visual {
  display: grid;
  width: 100%;
  height: 30px;
  place-items: center;
}

.icon-gallery__name-button {
  width: 100%;
  height: 44px;
  min-width: 0;
  max-width: 100%;
  border-radius: var(--h-radius-s);
  white-space: normal;
}

.icon-gallery__name-button:focus-visible {
  outline: 2px solid var(--h-border-brand-default);
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--h-border-brand-default) !important;
}

.icon-gallery__name {
  display: -webkit-box;
  max-width: 100%;
  max-height: 44px;
  height: 44px;
  overflow: hidden;
  font-size: 12px;
  line-height: 15px;
  overflow-wrap: anywhere;
  text-align: center;
  white-space: normal;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.icon-gallery__copy-state {
  color: var(--h-text-secondary);
  font-size: 12px;
  line-height: 16px;
  text-align: center;
}

.icon-gallery__copy-state.is-success {
  color: var(--h-text-success-default);
}

.icon-gallery__copy-state.is-error {
  color: var(--h-text-error-default);
}

@media (max-width: 560px) {
  .icon-gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
