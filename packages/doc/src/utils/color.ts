const HEX_INT_MAP: Record<string, number> = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };

export function parseHexChannel(hex: string) {
  if (hex.length === 2) {
    return (
      (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 +
      (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1])
    );
  }

  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
}

export function hex2rgb(hex: string) {
  let r, g, b;

  hex = hex.replace('#', '');

  if (hex.length === 3) {
    r = parseHexChannel(hex[0] + hex[0]);
    g = parseHexChannel(hex[1] + hex[1]);
    b = parseHexChannel(hex[2] + hex[2]);
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseHexChannel(hex.slice(0, 2));
    g = parseHexChannel(hex.slice(2, 4));
    b = parseHexChannel(hex.slice(4, 6));
  }

  return [r, g, b];
}
