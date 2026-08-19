export interface ScrollLockDocument {
  body: {
    dataset: Record<string, string | undefined>;
  };
}

function getDefaultDocument(): ScrollLockDocument | undefined {
  return typeof document === 'undefined' ? undefined : document;
}

export class BodyScrollLock {
  private count = 0;

  constructor(private readonly datasetKey = 'popupParentHidden') {}

  public get current(): number {
    return this.count;
  }

  public update(locked: boolean, target = getDefaultDocument()): void {
    this.count = Math.max(0, this.count + (locked ? 1 : -1));
    this.apply(target);
  }

  public reset(target = getDefaultDocument()): void {
    this.count = 0;
    this.apply(target);
  }

  private apply(target: ScrollLockDocument | undefined): void {
    if (!target) return;

    if (this.count > 0) target.body.dataset[this.datasetKey] = '';
    else delete target.body.dataset[this.datasetKey];
  }
}

export const bodyScrollLock = new BodyScrollLock();
