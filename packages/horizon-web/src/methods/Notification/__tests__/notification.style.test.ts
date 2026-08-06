import { resolve } from 'node:path';
import { compile } from 'sass';
import { describe, expect, test } from 'vitest';

const notificationRoot = resolve(__dirname, '..');
const stylesRoot = resolve(notificationRoot, '../../styles');

describe('Notification styles', () => {
  test('keeps the box shadow connected to an existing design token', () => {
    const globalVariablesCss = compile(resolve(stylesRoot, 'global-variables.scss')).css;
    const notificationCss = compile(resolve(notificationRoot, 'src/style/index.scss')).css;

    expect(globalVariablesCss).toContain('--h-shadow-down:');
    expect(globalVariablesCss).toContain(
      '--h-notification-box-shadow: var(--h-shadow-down);',
    );
    expect(notificationCss).toContain('box-shadow: var(--h-notification-box-shadow);');
  });
});
