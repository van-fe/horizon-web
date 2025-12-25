import { styleRoot } from '../../../../scripts/paths';
import * as fs from 'fs';
import { resolve } from 'path';
import { groupBy } from 'lodash';

const INT_HEX_MAP: Record<number, string> = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};

const hexOne = (value: number) => {
  value = Math.min(Math.round(value), 255);
  const high = Math.floor(value / 16);
  const low = value % 16;
  return `${INT_HEX_MAP[high] || high}${INT_HEX_MAP[low] || low}`;
};

const toHex = (r: number, g: number, b: number) => {
  if (Number.isNaN(+r) || Number.isNaN(+g) || Number.isNaN(+b)) return '';

  return `#${hexOne(r)}${hexOne(g)}${hexOne(b)}`;
};

const getHexValue = (rgb: string) => {
  const [r, g, b] = rgb.split(',').map(num => parseInt(num.trim()));
  return toHex(r, g, b);
};

export default function (colorsToken: Record<string, string>) {
  let content = 'export default {\n';

  const group = groupBy(
    Object.entries(colorsToken),
    ([key]) => key.match(/^--n-((\d{1,2}-\d{1,2}-)*color-\d+)-/)![1],
  );

  Object.keys(group).forEach(key => {
    const tokenMapping = Object.fromEntries(group[key]);
    let name = tokenMapping[`--n-${key}-name`];

    if (name.includes('-')) {
      name = `'${name}'`;
    }

    delete tokenMapping[`--n-${key}-name`];

    content += `  ${name}: [\n`;
    Object.values(tokenMapping).forEach(color => {
      content += `    '${getHexValue(color)}',\n`;
    });
    content += `  ],\n`;
  });

  content += `  white: '#FFFFFF',\n`;
  content += `  black: '#000000',\n`;
  content += `  transparent: 'transparent',\n`;

  content += '};\n';

  fs.writeFileSync(resolve(styleRoot, 'colors.ts'), content, 'utf-8');
}
