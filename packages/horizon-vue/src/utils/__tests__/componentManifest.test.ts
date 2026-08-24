import { describe, expect, it } from 'vitest';
import { buttonApiContract, buttonManifest, createComponentManifest } from '@aurora/core';
import {
  createVueEmitsFromManifest,
  createVueExposesFromManifest,
  createVuePropsFromManifest,
  createVueSlotsFromManifest,
} from '../componentManifest';

describe('Vue component manifest adapters', () => {
  it('creates renamed runtime props from Core types, defaults and validators', () => {
    const props = createVuePropsFromManifest(buttonManifest.contract.props, buttonApiContract, {
      rename: { variant: 'type', asyncAction: 'debounceFn' },
      omit: ['href'],
      omitDefaults: ['size'],
    });

    expect(props.type).toMatchObject({ type: String, default: 'primary' });
    expect(props.type?.validator?.('danger')).toBe(true);
    expect(props.type?.validator?.('invalid')).toBe(false);
    expect(props.size).not.toHaveProperty('default');
    expect(props.debounceFn?.type).toBe(Function);
    expect(props).not.toHaveProperty('href');
  });

  it('creates emits, slots and exposes from manifest field names', () => {
    const emits = createVueEmitsFromManifest(buttonManifest.contract.emits, {
      rename: { press: 'click' },
      validators: { click: (event: MouseEvent) => event instanceof MouseEvent },
      extend: { focus: (event: FocusEvent) => event instanceof FocusEvent },
    });
    const click = new MouseEvent('click');
    expect(emits.click?.(click as never)).toBe(true);
    expect(emits.actionFinished?.()).toBe(true);
    expect(emits.focus?.(new FocusEvent('focus') as never)).toBe(true);
    expect(createVueSlotsFromManifest(buttonManifest.contract.slots)).toBe(Object);
    expect(createVueExposesFromManifest(buttonManifest.contract.exposes)).toEqual({
      focus: Function,
    });
  });

  it('rejects missing runtime types and duplicate adapted names', () => {
    const malformed = createComponentManifest({
      name: 'Malformed',
      category: 'basic',
      description: { zh: '错误', en: 'Malformed' },
      semantics: [],
      accessibility: [],
      testVectors: [],
      contract: {
        props: [{ name: 'value', type: 'string', description: { zh: '值', en: 'Value' } }],
        emits: [],
        slots: [],
        exposes: [],
      },
    });

    expect(() =>
      createVuePropsFromManifest(malformed.contract.props, buttonApiContract),
    ).toThrowError('requires runtimeType');
    expect(() =>
      createVueSlotsFromManifest(buttonManifest.contract.slots, {
        rename: { content: 'icon' },
      }),
    ).toThrowError('duplicate field names');
  });
});
