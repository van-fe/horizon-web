export class EventEmitter<
  EventMapping extends Record<string, (...args: any) => void>,
  EventKey extends keyof EventMapping = keyof EventMapping,
> {
  private events: Record<EventKey, Array<EventMapping[EventKey]>> = {} as Record<
    EventKey,
    Array<EventMapping[EventKey]>
  >;

  public on<Key extends EventKey>(target: Key, callback: EventMapping[Key]) {
    if (!this.events[target]) {
      this.events[target] = [callback];
    } else {
      this.events[target].push(callback);
    }
  }

  public off<Key extends EventKey>(target: Key, callback: EventMapping[Key]) {
    if (this.events[target]) {
      this.events[target] = this.events[target].filter(curr => curr !== callback);
    }
  }

  public emit<
    Key extends EventKey,
    Func extends EventMapping[Key] & ((...args: any[]) => void),
    Args extends Parameters<Func>,
  >(target: Key, ...args: Args) {
    if (this.events[target]) {
      this.events[target].forEach(curr => {
        (curr as (...args: Args) => void).call(null, ...args);
      });
    }
  }
}
