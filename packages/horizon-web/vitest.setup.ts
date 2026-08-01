import { enableAutoUnmount } from '@vue/test-utils';
import { afterEach } from 'vitest';

// Keep teleports, listeners, and observers from leaking into the next test.
enableAutoUnmount(afterEach);
