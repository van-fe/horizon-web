import dayjs, { type Dayjs } from 'dayjs';
import type { HCalendarPinFlag } from '~/components/Calendar/src/utils/types';
import { cloneDeep } from 'lodash-es';
import type PinFlagsHelper from './PinFlagsHelper';
import { isObject, cssVariableKey } from '@aurora/utils';
import type { Ref } from 'vue';
import { unref } from 'vue';
import type { CalendarProps } from '../composables/useProps';
import { maxDayjs, minDayjs } from './timeHelper';
import { resolveCalendarSelectionRange } from '@aurora/core';
import type { CalendarPointerSelectionController } from '@aurora/horizon-core';
import { createCalendarPointerSelection } from '@aurora/horizon-core';

export default class DragToCreateFlag {
  private readonly scrollEl: Ref<HTMLElement | null>;
  private readonly props: CalendarProps;
  private readonly pinFlags: PinFlagsHelper;
  private crossDay = false;
  private controller?: CalendarPointerSelectionController;
  private tempPinFlag: HCalendarPinFlag | null = null;
  private dayStart?: Dayjs;
  private startAt?: Dayjs;

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
    const owner = unref(this.scrollEl);
    if (!this.props.enableCreatePinFlags || !owner) return;
    this.destroy();
    const target = e.target as HTMLElement;
    this.dayStart = dayStart;
    this.controller = createCalendarPointerSelection({
      owner,
      autoStart: false,
      resolveValue: event => {
        const rawSeconds =
          event === e
            ? e.offsetY / DragToCreateFlag.getOneSecondsHeightPx()
            : (event.clientY - target.getBoundingClientRect().top) /
              DragToCreateFlag.getOneSecondsHeightPx();
        return rawSeconds;
      },
      onStart: seconds => {
        const rounded = Math.floor(seconds / 1800) * 1800;
        this.startAt = dayStart.add(rounded, 'seconds');
        const cbData = this.props.creatingPinFlagCallback?.(this.startAt) ?? {};
        this.tempPinFlag = cloneDeep(
          this.pinFlags.addTempPinFlag(
            this.startAt,
            this.startAt.add(30, 'minutes'),
            cbData?.title,
            cbData?.type,
          ),
        );
      },
      onMove: (seconds, event) => {
        event.stopPropagation();
        this.updateSelection(seconds);
      },
      onCommit: () => void this.finishSelection(),
      onCancel: () => void this.finishSelection(),
    });
    this.controller.start(e);
  }

  private updateSelection(seconds: number) {
    const { dayStart, startAt, tempPinFlag } = this;
    if (!dayStart || !startAt || !tempPinFlag || !unref(this.scrollEl)) return;
    const mouseOnTime = dayStart.add(seconds, 'seconds');
    seconds = mouseOnTime.isAfter(startAt)
      ? Math.ceil(seconds / 1800) * 1800
      : Math.floor(seconds / 1800) * 1800;
    let currentTime = dayStart.add(seconds, 'seconds');
    if (!this.crossDay) {
      currentTime = minDayjs(maxDayjs(currentTime, dayStart), dayStart.endOf('day'));
    }
    const selection = resolveCalendarSelectionRange({
      anchor: startAt.valueOf(),
      current: currentTime.valueOf(),
      minimumDuration: 30 * 60 * 1000,
      disabledRanges: (this.props.disableHours?.(dayStart) ?? []).map(([start, end]) => ({
        start: start.valueOf(),
        end: end.valueOf(),
      })),
      canCrossDisabledRange: this.props.createFlagCanThoughDisableDateOrHour,
    });
    if (!selection) return;
    const currStartAt = dayjs(selection.start);
    const currEndAt = dayjs(selection.end);
    if (currStartAt.isSame(tempPinFlag._startAt) && currEndAt.isSame(tempPinFlag._endAt)) return;
    tempPinFlag._startAt = currStartAt;
    tempPinFlag.startAt = currStartAt;
    tempPinFlag._endAt = currEndAt;
    tempPinFlag.endAt = currEndAt;
    this.pinFlags.updateTempPinFlagDate(tempPinFlag);
  }

  private async finishSelection() {
    const tempPinFlag = this.tempPinFlag;
    this.tempPinFlag = null;
    this.controller?.destroy();
    this.controller = undefined;
    if (!tempPinFlag) return;
    const reserve = await this.props.creatFinishFlagCallback?.(tempPinFlag);
    if (isObject(reserve)) this.pinFlags.updateTempPinFlag(reserve, true, true);
    else if (reserve !== true) this.pinFlags.removeTempPinFlag(tempPinFlag);
    else this.pinFlags.updateTempPinFlag(tempPinFlag, true, true);
  }

  public destroy() {
    this.controller?.destroy();
    this.controller = undefined;
    if (this.tempPinFlag) this.pinFlags.removeTempPinFlag(this.tempPinFlag);
    this.tempPinFlag = null;
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
