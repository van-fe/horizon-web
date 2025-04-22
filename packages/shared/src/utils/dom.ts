import '../env.d';
import { safelyGetEventTarget } from '../helpers';

export function isElementInEventPathByClass(e: MouseEvent, findClasses: string[]): boolean {
  if (isChromeMouseEvent(e)) {
    for (const item of e.path) {
      for (const findClass of findClasses) {
        if (item.classList?.contains(findClass)) {
          return true;
        }
      }
    }
  }

  return false;
}

export function isChromeMouseEvent(e: MouseEvent | ChromeMouseEvent): e is ChromeMouseEvent {
  return (e as ChromeMouseEvent).path !== undefined;
}

export function findElementInEventPathByClass(
  e: MouseEvent,
  findClasses: string[],
): null | HTMLElement {
  if (isChromeMouseEvent(e)) {
    for (const item of e.path) {
      for (const findClass of findClasses) {
        if (item.classList?.contains(findClass)) {
          return item;
        }
      }
    }
  }

  return null;
}

export function getClientXY(evt: MouseEvent | TouchEvent) {
  let clientX: number;
  let clientY: number;
  if (evt.type.startsWith('touch')) {
    clientY = (evt as TouchEvent).touches[0].clientY;
    clientX = (evt as TouchEvent).touches[0].clientX;
  } else {
    clientY = (evt as MouseEvent).clientY;
    clientX = (evt as MouseEvent).clientX;
  }
  return {
    clientX,
    clientY,
  };
}

export function removeAllChildren(node: HTMLElement) {
  for (const child of node.children) {
    child.remove();
  }
}

export function findElementInEventTargetTreeByClass(evt: MouseEvent, className: string) {
  let res = null;
  let currentTarget = safelyGetEventTarget(evt) as HTMLElement | null;

  while (currentTarget) {
    if (currentTarget.classList.contains(className)) {
      res = currentTarget;
      break;
    } else {
      currentTarget = currentTarget.parentElement;
    }
  }

  return res;
}
