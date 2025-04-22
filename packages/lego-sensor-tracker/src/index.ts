import type { ConfigType } from './setting/config';
import BasicSupport from './BasicSupport';
import type { EventEmitterMap } from './setting/event';
import {
  EventEmitter,
  isBrowser,
  jsonStringify,
  debug,
  capitalize,
  useNamespace,
} from '@nio-fe/shared';
import type { App } from 'vue';
import Pick from 'lodash/pick';
import version from './version.json';
import recordPlugins from './setting/recordPlugins';
import { getCurrentInstance } from 'vue';
import Store from './utils/Store';
import type sensors from '@nio-fe/sensor-sdk';
export { ConfigType };

type SensorType = typeof sensors;

declare global {
  interface Window {
    sensorsDataAnalytic201505?: SensorType;
  }
}

export default class LegoSensorTracker extends BasicSupport {
  static _instance: LegoSensorTracker;
  private eventCenter = new EventEmitter<EventEmitterMap>();
  private store!: Store;
  private sensor!: SensorType;

  static async create(options: ConfigType) {
    if (!LegoSensorTracker._instance) {
      const instance = new LegoSensorTracker(options);
      await instance.init();
      LegoSensorTracker._instance = instance;
    }

    return LegoSensorTracker._instance;
  }

  constructor(options: ConfigType) {
    super(options);
    this.checkCurrentRunEnvironment();
    this.options = options;
  }

  private checkCurrentRunEnvironment() {
    if (!isBrowser() || !window?.location?.href || !window?.indexedDB) {
      throw new Error("You are not running lego in browser env. The sensor tracker won't run.");
    }
  }

  private async initSensor() {
    if (window['sensorsDataAnalytic201505']) {
      this.sensor = window.sensorsDataAnalytic201505;
    } else {
      this.sensor = (await import('@nio-fe/sensor-sdk')).default;
    }
  }

  private async init() {
    await this.initSensor();
    this.store = await Store.create();
    this.sensor.init(this.initOptions);
    this.sensor.registerPage(this.registerPageOptions);
    this.initEventListener();
  }

  private initEventListener() {
    this.eventCenter.on('login', loginId => {
      this.sensor.login(loginId);
    });

    this.eventCenter.on('logout', isChangeId => {
      this.sensor.logout(isChangeId);
    });

    this.eventCenter.on('quick', (name: string, data: any) => {
      this.sensor.quick(name, data);
    });

    this.eventCenter.on('method', (name: string, options: Record<string, unknown>) => {
      void this.recordPlugin(
        name,
        { optionsPrecise: Pick(options, recordPlugins[name]) },
        'method',
      );
    });

    this.eventCenter.on('directive', (name: string, options: Record<string, unknown>) => {
      void this.recordPlugin(
        name,
        { optionsPrecise: Pick(options, recordPlugins[name]) },
        'directive',
      );
    });
  }

  public emit<Key extends keyof EventEmitterMap>(
    target: Key,
    ...args: Parameters<EventEmitterMap[Key]>
  ) {
    this.eventCenter.emit(target, ...args);
  }

  public mixinTracker(app: App) {
    const record = (componentName: string, data: Record<string, unknown>) =>
      this.recordPlugin(componentName, data, 'component');

    app.mixin({
      mounted() {
        if (localStorage.getItem('lego-sensor-disabled')) {
          return;
        }

        const instance = getCurrentInstance();

        const name = instance?.proxy?.$options.name;

        if (!name || !Object.keys(recordPlugins).includes(name)) return;

        const props = instance?.proxy?.$props || {};

        void record(name, {
          propsPrecise: Pick(props, recordPlugins[name]),
        });
      },
    });
  }

  private async recordPlugin(
    name: string,
    data: Record<string, unknown>,
    type: 'component' | 'directive' | 'method',
  ) {
    name = name.replace(new RegExp(`^${useNamespace()}`), 'N');
    if (!Object.keys(recordPlugins).includes(name)) {
      return;
    }

    if (!(await this.checkIsRecorded(name, data))) {
      this.sensor.track(`Lego${capitalize(type)}Mounted`, {
        component: name,
        name,
        version: version.version,
        ...Object.fromEntries(
          Object.entries(data).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              return [key, jsonStringify(value)];
            } else {
              return [key, value];
            }
          }),
        ),
      });
    }
  }

  private checkIsRecorded(name: string, data: Record<string, unknown>): Promise<boolean> {
    return new Promise(async resolve => {
      const result = await this.store.get(name, window.location.pathname, version.version);

      if (result) {
        debug(`The plugin ${name} has been recorded.`, window.location.pathname, version.version);
        return resolve(true);
      } else {
        this.store
          .add({
            name,
            version: version.version,
            path: window.location.pathname,
          })
          .then(() => {
            resolve(false);
          })
          .catch((e: Error) => {
            if (e.name === 'ConstraintError') {
              resolve(true);
            }

            if (e.name === 'QuotaExceededError') {
              this.store.clear();
              resolve(true);
            }
          });
      }
    });
  }
}
