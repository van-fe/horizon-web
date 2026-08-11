export class EventEmitter<
  EventMapping extends Record<string, (...args: any[]) => void> = Record<
    string,
    (...args: any[]) => void
  >,
  EventKey extends keyof EventMapping = keyof EventMapping,
> {
  private readonly events = new Map<EventKey, Array<EventMapping[EventKey]>>();

  public on<Key extends EventKey>(target: Key, callback: EventMapping[Key]): void {
    const callbacks = this.events.get(target) ?? [];
    callbacks.push(callback);
    this.events.set(target, callbacks);
  }

  public off<Key extends EventKey>(target: Key, callback: EventMapping[Key]): void {
    const callbacks = this.events.get(target);
    if (!callbacks) return;

    const remaining = callbacks.filter(current => current !== callback);
    if (remaining.length === 0) this.events.delete(target);
    else this.events.set(target, remaining);
  }

  public emit<
    Key extends EventKey,
    Func extends EventMapping[Key] & ((...args: any[]) => void),
    Args extends Parameters<Func>,
  >(target: Key, ...args: Args): void {
    this.events.get(target)?.forEach(callback => {
      (callback as (...args: Args) => void)(...args);
    });
  }

  public clear(target?: EventKey): void {
    if (target === undefined) this.events.clear();
    else this.events.delete(target);
  }
}
