import { generator, tinycolor } from '@nio-fe/colors';

export function generateColorList(
  basicTextColor: string,
  basicBackgroundColor: string,
  plain = false,
) {
  const textTarget = generator(basicTextColor, {
    backgroundColor: basicBackgroundColor,
  });
  const mainColors = textTarget.colors;

  if (plain) {
    return {
      text: {
        default: mainColors[5],
        hover: mainColors[4],
        press: mainColors[6],
        disabled: mainColors[2],
        active: mainColors[5],
      },
      background: {
        default: '#FFF',
        hover: '#FFF',
        press: '#FFF',
        disabled: '#FFF',
        active: textTarget.colorIns.mix('#FFF', 85).toHexString(),
      },
      border: {
        default: mainColors[5],
        hover: mainColors[4],
        press: mainColors[6],
        disabled: mainColors[2],
        active: mainColors[5],
      },
    };
  } else {
    return {
      text: {
        default: tinycolor(mainColors[1]).isLight() ? mainColors[5] : '#FFF',
        hover: '#FFF',
        press: '#FFF',
        disabled: mainColors[2],
        active: '#FFF',
      },
      background: {
        default: mainColors[0],
        hover: mainColors[4],
        press: mainColors[6],
        disabled: textTarget.colorIns.setAlpha(0.15).toHex8String(),
        active: mainColors[5],
      },
      border: {
        default: 'transparent',
        hover: 'transparent',
        press: 'transparent',
        disabled: 'transparent',
        active: 'transparent',
      },
    };
  }
}
