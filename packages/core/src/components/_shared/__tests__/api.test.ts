import { describe, expectTypeOf, it } from 'vitest';
import type { AdaptComponentApiShape } from '../api';

interface SourceShape {
  readonly optional?: string;
  required: number;
  omitted?: boolean;
}

type AdaptedShape = AdaptComponentApiShape<
  SourceShape,
  { optional: 'renamed' },
  'omitted',
  { extended?: Date }
>;

describe('component API shape adapter', () => {
  it('preserves optional, required, readonly, omitted and extended fields', () => {
    expectTypeOf<AdaptedShape>().toEqualTypeOf<{
      readonly renamed?: string;
      required: number;
      extended?: Date;
    }>();
  });
});
