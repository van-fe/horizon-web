import { ref } from 'vue';

export const mountedStack = ref<string[]>([]);
export const mountedStackInfo = ref<Array<{ uuid: string; hasIconDesc: boolean }>>([]);
