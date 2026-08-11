import { enableAutoUnmount } from '@vue/test-utils';
import { afterEach } from 'vitest';
import './src/styles/index.scss';

// Keep teleports, listeners, and observers from leaking into the next test.
enableAutoUnmount(afterEach);
