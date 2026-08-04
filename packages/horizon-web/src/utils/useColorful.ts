import { generator, tinycolor } from '@aurora/colors';
import { cssVariable, cssVariableKey } from '@aurora/utils';

export function generateColorList(
  basicTextColor: string,
  basicBackgroundColor: string | undefined,
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

export function getCssVariableByStatus(
  component: string,
  color: string,
  type: 'default' | 'plain' | 'text' | 'link' | 'ghost',
  status: 'primary' | 'normal' | 'danger' = 'primary',
) {
  const generatedColor = generator(color);
  const colorList = generatedColor.colors;
  const isColorDark = generatedColor.colorIns.isDark();
  const variable = (...segments: string[]) => cssVariableKey(component, ...segments);

  switch (type) {
    case 'default': {
      const mainColor = isColorDark ? cssVariable('text-inverse') : cssVariable('text-primary');
      const borderColor = cssVariable('border-transparent');
      return {
        [variable('color', status)]: mainColor,
        [variable('background', status)]: colorList[5],
        [variable('border-color', status)]: borderColor,
        [variable('color', status, 'activated')]: mainColor,
        [variable('background', status, 'activated')]: colorList[5],
        [variable('border-color', status, 'activated')]: borderColor,
        [variable('color', status, 'hover')]: mainColor,
        [variable('background', status, 'hover')]: colorList[4],
        [variable('border-color', status, 'hover')]: borderColor,
        [variable('color', status, 'press')]: mainColor,
        [variable('background', status, 'press')]: colorList[6],
        [variable('border-color', status, 'press')]: borderColor,
        [variable('color', status, 'disabled')]: mainColor,
        [variable('background', status, 'disabled')]: generatedColor.colorIns
          .mix('#FFF', 70)
          .toHex8String(),
        [variable('border-color', status, 'disabled')]: borderColor,
      };
    }
    case 'plain': {
      const backgroundColor = isColorDark ? cssVariable('bg-default') : cssVariable('bg-inverse');
      const disabledColor = generatedColor.colorIns.mix('#FFF', 70).toHex8String();

      return {
        [variable('color', status, 'plain')]: colorList[5],
        [variable('background', status, 'plain')]: backgroundColor,
        [variable('border-color', status, 'plain')]: colorList[5],
        [variable('color', status, 'plain', 'activated')]: colorList[5],
        [variable('background', status, 'plain', 'activated')]: backgroundColor,
        [variable('border-color', status, 'plain', 'activated')]: colorList[5],
        [variable('color', status, 'plain', 'hover')]: colorList[4],
        [variable('background', status, 'plain', 'hover')]: backgroundColor,
        [variable('border-color', status, 'plain', 'hover')]: colorList[4],
        [variable('color', status, 'plain', 'press')]: colorList[6],
        [variable('background', status, 'plain', 'press')]: backgroundColor,
        [variable('border-color', status, 'plain', 'press')]: colorList[6],
        [variable('color', status, 'plain', 'disabled')]: disabledColor,
        [variable('background', status, 'plain', 'disabled')]: backgroundColor,
        [variable('border-color', status, 'plain', 'disabled')]: disabledColor,
      };
    }
    case 'ghost': {
      const mainColor = isColorDark
        ? generatedColor.colorIns.mix('#FFF', 80).toHex8String()
        : colorList[5];
      const disabledColor = generatedColor.colorIns.setAlpha(0.5).toHex8String();

      return {
        [variable('color', status, 'plain', 'ghost')]: mainColor,
        [variable('border-color', status, 'plain', 'ghost')]: mainColor,
        [variable('color', status, 'plain', 'ghost', 'activated')]: mainColor,
        [variable('border-color', status, 'plain', 'ghost', 'activated')]: mainColor,
        [variable('color', status, 'plain', 'ghost', 'hover')]: colorList[4],
        [variable('border-color', status, 'plain', 'ghost', 'hover')]: colorList[4],
        [variable('color', status, 'plain', 'ghost', 'press')]: colorList[6],
        [variable('border-color', status, 'plain', 'ghost', 'press')]: colorList[6],
        [variable('color', status, 'plain', 'ghost', 'disabled')]: disabledColor,
        [variable('border-color', status, 'plain', 'ghost', 'disabled')]: disabledColor,
      };
    }
    case 'link': {
      return {
        [variable('color', status, 'link')]: colorList[5],
        [variable('color', status, 'link', 'activated')]: colorList[5],
        [variable('color', status, 'link', 'hover')]: colorList[4],
        [variable('color', status, 'link', 'press')]: colorList[6],
        [variable('color', status, 'link', 'disabled')]: generatedColor.colorIns
          .mix('#FFF', 70)
          .toHex8String(),
      };
    }
    case 'text': {
      return {
        [variable('color', status, 'text')]: colorList[5],
        [variable('color', status, 'text', 'activated')]: colorList[5],
        [variable('color', status, 'text', 'activated', 'hover')]: colorList[4],
        [variable('color', status, 'text', 'activated', 'press')]: colorList[6],
        [variable('color', status, 'text', 'hover')]: colorList[4],
        [variable('color', status, 'text', 'press')]: colorList[6],
        [variable('color', status, 'text', 'disabled')]: generatedColor.colorIns
          .mix('#FFF', 70)
          .toHex8String(),
        [variable('border-color', status, 'text', 'disabled')]: 'transparent',
      };
    }
  }
}
