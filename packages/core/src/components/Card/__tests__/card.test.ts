import { describe, expect, it } from 'vitest';
import { CARD_DEFAULTS, cardApiContract, cardManifest, isCardRadius } from '..';

describe('Card contract', () => {
  it('owns renderer-neutral defaults and radius validation', () => {
    expect(cardApiContract.defaults).toBe(CARD_DEFAULTS);
    expect(isCardRadius('none')).toBe(true);
    expect(isCardRadius('round')).toBe(false);
  });

  it('derives manifest defaults from the API contract', () => {
    expect(cardManifest.contract.props.find(field => field.name === 'radius')?.defaultValue).toBe(
      'medium',
    );
  });
});
