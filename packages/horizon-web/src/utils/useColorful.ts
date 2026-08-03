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
) {
  const generatedColor = generator(color);
  const colorList = generatedColor.colors;
  const isColorDark = generatedColor.colorIns.isDark();

  switch (type) {
    case 'default': {
      const mainColor = isColorDark ? cssVariable('text-inverse') : cssVariable('text-primary');
      return {
        [cssVariableKey(component, 'color', '-primary')]: mainColor,
        [cssVariableKey(component, 'bg', '-primary')]: colorList[5],
        [cssVariableKey(component, 'color', '-primary', '-hover')]: mainColor,
        [cssVariableKey(component, 'bg', '-primary', '-hover')]: colorList[4],
        [cssVariableKey(component, 'color', '-primary', '-press')]: mainColor,
        [cssVariableKey(component, 'bg', '-primary', '-press')]: colorList[6],
        [cssVariableKey(component, 'color', '-primary', '-disabled')]: mainColor,
        [cssVariableKey(component, 'bg', '-primary', '-disabled')]: generatedColor.colorIns
          .mix('#FFF', 70)
          .toHex8String(),
      };
    }
    case 'plain': {
      const backgroundColor = isColorDark ? cssVariable('bg-default') : cssVariable('bg-inverse');
      const disabledColor = generatedColor.colorIns.mix('#FFF', 70).toHex8String();

      return {
        [cssVariableKey(component, 'color', '-primary', '-plain')]: colorList[5],
        [cssVariableKey(component, 'bg', '-primary', '-plain')]: backgroundColor,
        [cssVariableKey(component, 'border-color', '-primary', '-plain')]: colorList[5],
        [cssVariableKey(component, 'color', '-primary', '-plain', '-hover')]: colorList[4],
        [cssVariableKey(component, 'bg', '-primary', '-plain', '-hover')]: backgroundColor,
        [cssVariableKey(component, 'border-color', '-primary', '-plain', '-hover')]: colorList[4],
        [cssVariableKey(component, 'color', '-primary', '-plain', '-press')]: colorList[6],
        [cssVariableKey(component, 'bg', '-primary', '-plain', '-press')]: backgroundColor,
        [cssVariableKey(component, 'border-color', '-primary', '-plain', '-press')]: colorList[6],
        [cssVariableKey(component, 'color', '-primary', '-plain', '-disabled')]: disabledColor,
        [cssVariableKey(component, 'bg', '-primary', '-plain', '-disabled')]: backgroundColor,
        [cssVariableKey(component, 'border-color', '-primary', '-plain', '-disabled')]:
          disabledColor,
      };
    }
    case 'ghost': {
      const mainColor = isColorDark
        ? generatedColor.colorIns.mix('#FFF', 80).toHex8String()
        : colorList[5];
      const disabledColor = generatedColor.colorIns.setAlpha(0.5).toHex8String();

      return {
        [cssVariableKey(component, 'color', '-primary', '-plain', '-ghost')]: mainColor,
        [cssVariableKey(component, 'border-color', '-primary', '-plain', '-ghost')]: mainColor,
        [cssVariableKey(component, 'color', '-primary', '-plain', '-ghost', '-hover')]:
          colorList[4],
        [cssVariableKey(component, 'border-color', '-primary', '-plain', '-ghost', '-hover')]:
          colorList[4],
        [cssVariableKey(component, 'color', '-primary', '-plain', '-ghost', '-press')]:
          colorList[6],
        [cssVariableKey(component, 'border-color', '-primary', '-plain', '-ghost', '-press')]:
          colorList[6],
        [cssVariableKey(component, 'color', '-primary', '-plain', '-ghost', '-disabled')]:
          disabledColor,
        [cssVariableKey(component, 'border-color', '-primary', '-plain', '-ghost', '-disabled')]:
          disabledColor,
      };
    }
    case 'link': {
      return {
        [cssVariableKey(component, 'color', '-primary', '-link')]: colorList[5],
        [cssVariableKey(component, 'color', '-primary', '-link', '-hover')]: colorList[4],
        [cssVariableKey(component, 'color', '-primary', '-link', '-press')]: colorList[6],
        [cssVariableKey(component, 'color', '-primary', '-link', '-disabled')]:
          generatedColor.colorIns.mix('#FFF', 70).toHex8String(),
      };
    }
    case 'text': {
      return {
        [cssVariableKey(component, 'color', '-primary', '-text')]: colorList[5],
        [cssVariableKey(component, 'color', '-primary', '-text', '-hover')]: colorList[5],
        [cssVariableKey(component, 'color', '-primary', '-text', '-press')]: colorList[5],
        [cssVariableKey(component, 'color', '-primary', '-text', '-disabled')]:
          generatedColor.colorIns.mix('#FFF', 70).toHex8String(),
        [cssVariableKey(component, 'border-color', '-primary', '-text', '-disabled')]:
          'transparent',
      };
    }
  }
}
