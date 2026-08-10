import { describe, expect, it, vi } from 'vitest';
import {
  addValue,
  arrayableToArray,
  EventEmitter,
  isDefined,
  jsonParse,
  jsonStringify,
  remainderValue,
} from '..';

describe('@aurora/core', () => {
  it('normalizes arrayable values without framework state', () => {
    expect(arrayableToArray('value')).toEqual(['value']);
    expect(arrayableToArray(['value'])).toEqual(['value']);
  });

  it('handles decimal operations deterministically', () => {
    expect(addValue(0.1, 0.2)).toBe(0.3);
    expect(remainderValue(0.3, 0.1)).toBe(0);
  });

  it('serializes circular objects and rejects invalid JSON', () => {
    const value: Record<string, unknown> = {};
    value.self = value;

    expect(jsonStringify(value)).toContain('[Circular]');
    expect(jsonParse('{"ok":true}')).toEqual({ ok: true });
    expect(jsonParse('{')).toBeUndefined();
  });

  it('supports typed subscriptions and cleanup', () => {
    type Events = { change: (value: number) => void };
    const emitter = new EventEmitter<Events>();
    const listener = vi.fn();
    emitter.on('change', listener);

    emitter.emit('change', 1);
    emitter.off('change', listener);
    emitter.emit('change', 2);

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith(1);
    expect(isDefined(listener)).toBe(true);
  });

  it('preserves duplicate listener registration behavior', () => {
    type Events = { change: () => void };
    const emitter = new EventEmitter<Events>();
    const listener = vi.fn();

    emitter.on('change', listener);
    emitter.on('change', listener);
    emitter.emit('change');

    expect(listener).toHaveBeenCalledTimes(2);
  });
});
