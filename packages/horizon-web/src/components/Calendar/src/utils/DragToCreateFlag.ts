import type { Dayjs } from 'dayjs';
import type { HCalendarPinFlag } from '~/components/Calendar/src/utils/types';
import cloneDeep from 'lodash/cloneDeep';
import type PinFlagsHelper from './PinFlagsHelper';
import { isObject, cssVariableKey } from '@aurora/utils';
import type { Ref } from 'vue';
import { unref } from 'vue';
import type { CalendarProps } from '../composables/useProps';
import { getDatesRangeExcludeParts, maxDayjs, minDayjs, sortDatePos } from './timeHelper';

export default class DragToCreateFlag {
  private readonly scrollEl: Ref<HTMLElement | null>;
  private readonly props: CalendarProps;
  private readonly pinFlags: PinFlagsHelper;
  private crossDay = false;

  constructor(scrollEl: Ref<HTMLElement | null>, pinFlags: PinFlagsHelper, props: CalendarProps) {
    this.scrollEl = scrollEl;
    this.pinFlags = pinFlags;
    this.props = props;
  }

  /**
   * whether you can drag to create a cross day flag
   */
  public setCanCrossDay(status: boolean) {
    this.crossDay = status;
  }

  public onMousedown(e: MouseEvent, dayStart: Dayjs) {
    if (!this.props.enableCreatePinFlags || !unref(this.scrollEl)) return;

    let isDuringDragging = true;
    const target = e.target as HTMLElement;
    const seconds = Math.floor(e.offsetY / DragToCreateFlag.getOneSecondsHeightPx() / 1800) * 1800;
    const startAt = dayStart.add(seconds, 'seconds');
    const endAt = startAt.add(30, 'minutes');

    const cbData = this.props.creatingPinFlagCallback?.(startAt) ?? {};

    let tempPinFlag: HCalendarPinFlag | null = cloneDeep(
      this.pinFlags.addTempPinFlag(startAt, endAt, cbData?.title, cbData?.type),
    );

    const onMousemove = (e: MouseEvent) => {
      e.stopPropagation();
      if (isDuringDragging && tempPinFlag && unref(this.scrollEl) && target) {
        let seconds =
          (e.clientY - target.getBoundingClientRect().top) /
          DragToCreateFlag.getOneSecondsHeightPx();
        const mouseOnTime = dayStart.add(seconds, 'seconds');

        if (mouseOnTime.isAfter(startAt)) {
          seconds = Math.ceil(seconds / 1800) * 1800;
        } else {
          seconds = Math.floor(seconds / 1800) * 1800;
        }

        let currentTime = dayStart.add(seconds, 'seconds');
        if (!this.crossDay) {
          currentTime = minDayjs(maxDayjs(currentTime, dayStart), dayStart.endOf('day'));
        }

        let currStartAt = minDayjs(startAt, currentTime);
        let currEndAt = maxDayjs(startAt.add(30, 'minutes'), currentTime);

        if (!currStartAt.isSame(tempPinFlag._startAt) || !currEndAt.isSame(tempPinFlag._endAt)) {
          const disabledHours = this.props.disableHours?.(dayStart);

          if (disabledHours) {
            for (const hours of disabledHours) {
              const excludeParts = getDatesRangeExcludeParts([currStartAt, currEndAt], hours);

              if (excludeParts === undefined) {
                return;
              } else if (excludeParts.length > 1) {
                if (this.props.createFlagCanThoughDisableDateOrHour) {
                  const sortedTimes = sortDatePos(...excludeParts.flat());
                  [currStartAt, currEndAt] = [sortedTimes[0], sortedTimes.at(-1)!];
                } else {
                  if (mouseOnTime.isAfter(startAt)) {
                    [currStartAt, currEndAt] = excludeParts[0];
                  } else {
                    [currStartAt, currEndAt] = excludeParts.at(-1)!;
                  }
                }
              } else {
                [currStartAt, currEndAt] = excludeParts[0];
              }
            }
          }

          tempPinFlag._startAt = currStartAt;
          tempPinFlag.startAt = currStartAt;
          tempPinFlag._endAt = currEndAt;
          tempPinFlag.endAt = currEndAt;
          this.pinFlags.updateTempPinFlagDate(tempPinFlag);
        }
      }
    };

    const onMouseup = async () => {
      isDuringDragging = false;

      if (tempPinFlag) {
        const reserve = await this.props.creatFinishFlagCallback?.(tempPinFlag);

        if (isObject(reserve)) {
          this.pinFlags.updateTempPinFlag(reserve, true, true);
        } else if (reserve !== true) {
          this.pinFlags.removeTempPinFlag(tempPinFlag);
        } else {
          this.pinFlags.updateTempPinFlag(tempPinFlag, true, true);
        }

        tempPinFlag = null;
      }

      document.documentElement.removeEventListener('mousemove', onMousemove);
      document.documentElement.removeEventListener('mouseup', onMouseup);
      document.documentElement.removeEventListener('mouseleave', onMouseup);
    };

    document.documentElement.addEventListener('mousemove', onMousemove);
    document.documentElement.addEventListener('mouseup', onMouseup);
    document.documentElement.addEventListener('mouseleave', onMouseup);
  }

  public static getOneSecondsHeightPx() {
    return (
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          cssVariableKey('calendar', 'size', 'week', 'hour-cell', 'height'),
        ),
      ) / 3600
    );
  }
}
