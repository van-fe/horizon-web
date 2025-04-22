import type { ColorPickerProps } from '../composables/useProps';
import SingleColor from './SingleColor';
import type { Ref } from 'vue';
import { ref } from 'vue';
import uniqueId from 'lodash/uniqueId';
import round from 'lodash/round';

export const gradientColorDirection = [
  'top',
  'right',
  'bottom',
  'left',
  'top right',
  'top left',
  'bottom right',
  'bottom left',
] as const;

const gradientColorDirectionToDegree: Record<(typeof gradientColorDirection)[number], number> = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
  'top right': 45,
  'top left': 315,
  'bottom right': 135,
  'bottom left': 225,
};

export type GradientColorDirectionType = (typeof gradientColorDirection)[number];

export interface GradientColorType {
  color: SingleColor;
  percent: number;
  id: string;
}

export enum ColorTypeEnum {
  Pure = 'pure',
  Linear = 'linear',
  Radial = 'radial',
  Conic = 'conic',
}

export default class ColorPickerColor {
  public hasInit = false;

  /**
   * 最终往外抛出的数值
   */
  public resultsValue = ref('');

  /**
   * color-picker 的传入Props
   */
  public props: ColorPickerProps;

  /**
   * 渐变角度
   */
  public degree: Ref<number> = ref(90);

  /**
   * 径向渐变类型
   */
  public radialType: Ref<'circle' | 'ellipse'> = ref('circle');

  /**
   * 存储的多色值
   */
  public values: Ref<GradientColorType[]> = ref([]);

  /**
   * 当前颜色类型
   */
  public colorType: Ref<ColorTypeEnum> = ref(ColorTypeEnum.Pure);

  public setColorType(type: ColorTypeEnum) {
    this.colorType.value = type;
    this.activeIndex.value = 0;
    this.resultsValue.value = this.value;
    this.hasInit = true;

    if (type !== ColorTypeEnum.Pure && this.values.value.length === 1) {
      this.addColor('#000', 100);
    }
  }

  /**
   * 当前正在调整的color，如果是 pure 则忽视此值
   */
  public activeIndex = ref(0);

  /**
   * 获取当前活动的色彩对象
   */
  public get currentActiveColorTarget() {
    return this.values.value[
      this.colorType.value === ColorTypeEnum.Pure ? 0 : this.activeIndex.value
    ];
  }

  /**
   * 设置当前活动的颜色
   * @param index
   */
  public setCurrentActiveColorTarget(index: number) {
    this.activeIndex.value = index;
  }

  /**
   * 根据ID设置当前活动的对象
   * @param id
   */
  public setCurrentActiveColorTargetById(id: string) {
    this.activeIndex.value = this.values.value.findIndex(curr => curr.id === id);
  }

  public get value() {
    const sortedValues = this.values.value.concat().sort((a, b) => a.percent - b.percent);
    switch (this.colorType.value) {
      case ColorTypeEnum.Pure:
        return this.values.value[0]?.color.value;
      case ColorTypeEnum.Linear:
        return `linear-gradient(${this.degree.value}deg, ${sortedValues
          .map(value => `${value.color.value} ${round(value.percent, 2)}%`)
          .join(', ')})`;
      case ColorTypeEnum.Radial:
        return `radial-gradient(${this.radialType.value}, ${sortedValues
          .map(value => `${value.color.value} ${round(value.percent, 2)}%`)
          .join(', ')})`;
      case ColorTypeEnum.Conic:
        return `conic-gradient(${sortedValues
          .map(value => `${value.color.value} ${((value.percent / 100) * 360).toFixed(2)}deg`)
          .join(', ')})`;
    }
  }

  public set value(color: string) {
    this.fromString(color);
  }

  constructor(props: ColorPickerProps) {
    this.props = props;
    this.fromString(props.modelValue || '');
    this.doChange = this.doChange.bind(this);
  }

  public setDefaultValue(color?: string) {
    this.setColorType(ColorTypeEnum.Pure);
    this.values.value = [
      {
        color: new SingleColor(
          this.props,
          () => {
            this.doChange();
          },
          color || '',
        ),
        percent: 0,
        id: uniqueId(),
      },
    ];
  }

  public fromString(value: string) {
    if (!value) {
      this.colorType.value = ColorTypeEnum.Pure;
      this.values.value = [
        {
          color: new SingleColor(this.props, () => {
            this.doChange();
          }),
          percent: 0,
          id: uniqueId(),
        },
      ];
      this.resultsValue.value = '';
      this.doChange();
      return;
    }

    this.analysisColor(value);
  }

  /**
   * 分析颜色
   */
  public analysisColor(color: string) {
    if (ColorPickerColor.isGradientColor(color)) {
      this.analyseGradientColor(color);
    } else {
      this.setDefaultValue(color);
    }

    this.doChange();
  }

  /**
   * 将色值载入到 resultsValue 上，以通知组件更新
   */
  public doChange() {
    if (this.hasInit) {
      this.resultsValue.value = this.value;
    } else {
      this.hasInit = true;
    }
  }

  static isGradientColor(color: string) {
    return /^\w+-gradient/.test(color.trim());
  }

  public analyseGradientColor(color: string) {
    const values = color.match(/\w+-gradient\((.*?)\)/)?.[1] || '';
    const matches = values.split(',');
    if (matches) {
      if (color.includes('linear-gradient')) {
        this.colorType.value = ColorTypeEnum.Linear;
        if (/^\d+deg\s*/.test(matches[0])) {
          this.degree.value = Number(matches[0].replace(/deg\s*/, '')) || 90;
          matches.shift();
        }
        if (/^(to)*\s*[a-zA-Z]+/.test(matches[0])) {
          const direction = matches[0].replace(
            /^to\s*/,
            '',
          ) as (typeof gradientColorDirection)[number];
          this.degree.value = gradientColorDirectionToDegree[direction];
          matches.shift();
        }
      } else if (color.includes('radial-gradient')) {
        this.colorType.value = ColorTypeEnum.Radial;
        if (['circle', 'ellipse'].includes(matches[0].trim())) {
          this.radialType.value = matches[0].trim() as 'circle' | 'ellipse';
          matches.shift();
        }
      } else if (color.includes('conic-gradient')) {
        this.colorType.value = ColorTypeEnum.Conic;
      }

      this.values.value = matches.map((color, index, sum) => {
        const value = color.trim().split(' ');

        let percent;

        if (this.colorType.value === ColorTypeEnum.Conic) {
          percent =
            value.length === 1
              ? index * (1 / sum.length)
              : round((parseFloat(value[1]) / 360) * 100, 2);
        } else {
          percent = value.length === 1 ? index * (1 / sum.length) : parseFloat(value[1]);
        }

        return {
          color: new SingleColor(
            this.props,
            () => {
              this.doChange();
            },
            value[0],
          ),
          percent,
          id: uniqueId(),
        };
      });
    }
  }

  public addColor(color: string, percent = 0) {
    this.values.value.push({
      color: new SingleColor(
        this.props,
        () => {
          this.doChange();
        },
        color,
      ),
      percent,
      id: uniqueId(),
    });

    this.activeIndex.value = this.values.value.length - 1;
    this.resultsValue.value = this.value;
  }

  public removeColor(index = this.activeIndex.value) {
    this.values.value.splice(index, 1);
    this.activeIndex.value = 0;
    this.resultsValue.value = this.value;
  }

  public setColorPercent(percent: number, index = this.activeIndex.value) {
    this.values.value[index].percent = percent;
    this.resultsValue.value = this.value;
  }

  public getTrackResultColor() {
    const sortedValues = this.values.value.concat().sort((a, b) => a.percent - b.percent);

    switch (this.colorType.value) {
      case ColorTypeEnum.Pure:
        return this.value;
      default:
        return `linear-gradient(to right, ${sortedValues
          .map(value => `${value.color.value} ${round(value.percent, 2)}%`)
          .join(', ')})`;
    }
  }

  public setDegree(degree: number) {
    this.degree.value = degree;
    this.resultsValue.value = this.value;
  }

  public setRadialType(type: 'circle' | 'ellipse') {
    this.radialType.value = type;
    this.resultsValue.value = this.value;
  }

  public clearValue() {
    this.setColorType(ColorTypeEnum.Pure);
    this.currentActiveColorTarget.color.clearColor();
  }
}
