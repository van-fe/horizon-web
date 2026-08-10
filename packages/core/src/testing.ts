import type { ButtonActionInput, ButtonActionKind } from './button';
import type { SwitchStateInput } from './switch';

export const buttonActionTestVectors: ReadonlyArray<{
  name: string;
  input: ButtonActionInput;
  expected: ButtonActionKind;
}> = [
  {
    name: 'disabled blocks every action',
    input: { disabled: true, href: '/next' },
    expected: 'blocked',
  },
  {
    name: 'loading blocks every action',
    input: { loading: true, hasAsyncAction: true },
    expected: 'blocked',
  },
  {
    name: 'href has priority over route and async actions',
    input: { href: '/next', route: '/route', canNavigateRoute: true, hasAsyncAction: true },
    expected: 'href',
  },
  {
    name: 'an available route has priority over async actions',
    input: { route: '/route', canNavigateRoute: true, hasAsyncAction: true },
    expected: 'route',
  },
  {
    name: 'an unavailable route falls through to the async action',
    input: { route: '/route', canNavigateRoute: false, hasAsyncAction: true },
    expected: 'async',
  },
  { name: 'a plain button emits a press', input: {}, expected: 'press' },
];

export const switchStateTestVectors: ReadonlyArray<{
  name: string;
  input: SwitchStateInput;
  interactive: boolean;
}> = [
  { name: 'normal', input: { value: false }, interactive: true },
  { name: 'disabled', input: { value: false, disabled: true }, interactive: false },
  { name: 'readonly', input: { value: true, readonly: true }, interactive: false },
  { name: 'pending', input: { value: true, pending: true }, interactive: false },
];
