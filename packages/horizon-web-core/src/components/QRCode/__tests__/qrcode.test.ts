import { describe, expect, it } from 'vitest';
import { generateQRCodeSvg } from '..';

describe('generateQRCodeSvg', () => {
  it('generates an SVG with the requested colors and size', async () => {
    const svg = await generateQRCodeSvg({
      value: 'https://example.com',
      size: 128,
      margin: 2,
      level: 'H',
      color: '#123456',
      background: '#fedcba',
    });
    expect(svg).toContain('<svg');
    expect(svg).toContain('width="128"');
    expect(svg).toContain('#123456');
    expect(svg).toContain('#fedcba');
  });
});
