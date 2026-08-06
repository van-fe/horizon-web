import type { LangOptions, LocalOptionType, LocaleSupportLang } from '@aurora/locale';
import { LocaleService } from '@aurora/locale';

export type ReactLocaleOptions = LocalOptionType & {
  lang: LangOptions;
};

export type LocaleSubscriber = () => void;

export default class ReactLocaleService extends LocaleService {
  private readonly subscribers = new Set<LocaleSubscriber>();

  constructor(options: ReactLocaleOptions) {
    super(options);
  }

  public override get current(): LocaleSupportLang {
    return super.current;
  }

  public override set current(current: LocaleSupportLang) {
    if (current === super.current) return;

    super.current = current;
    this.subscribers.forEach(subscriber => subscriber());
  }

  public readonly setCurrent = (current: LocaleSupportLang): void => {
    this.current = current;
  };

  public readonly getSnapshot = (): LocaleSupportLang => this.current;

  public readonly subscribe = (subscriber: LocaleSubscriber): (() => void) => {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  };
}
