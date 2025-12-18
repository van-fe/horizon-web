import type { ConfigType } from './setting/config';
import { DefaultEvnMap, EnvEnum } from './setting/config';
import { snakeCase } from '@nio-fe/shared';
import { objectTransformSnakeCaseKey } from './utils';

export default class BasicSupport {
  static sensorProjectProd = 'nio_business_prod';
  static sensorProjectTest = 'nio_business_test';
  static sensorRegisterPageDefaultOptions: ConfigType['sensorConfig']['params'] = {};

  protected options: ConfigType;

  constructor(options: ConfigType) {
    this.options = options;
  }

  protected get initOptions() {
    return objectTransformSnakeCaseKey({
      serverUrl: `https://sensors.nio.com/sa?project=${
        this.options.sensorConfig.basic?.project ||
        (this.getCurrentEnv() === EnvEnum.PROD
          ? BasicSupport.sensorProjectProd
          : BasicSupport.sensorProjectTest)
      }`,
      ...(this.options.sensorConfig.extra || {}),
    });
  }

  protected get registerPageOptions() {
    const params: Record<string, unknown> = {};

    Object.entries({
      workerUserId: this.getUserId(),
      ...BasicSupport.sensorRegisterPageDefaultOptions,
      ...this.options.sensorConfig.params,
    }).forEach(([key, value]) => {
      params[snakeCase(key)] = typeof value === 'function' ? value() : value;
    });

    return params;
  }

  protected getCurrentEnv(): EnvEnum | string {
    if (typeof this.options.getCurrentEnv === 'function') {
      return this.options.getCurrentEnv();
    } else {
      if (typeof window === 'undefined') {
        return EnvEnum.DEV;
      }

      const { host = '' } = window.location;

      if (host.includes('localhost') || host.includes('127.0.0.1')) {
        return EnvEnum.DEV;
      }

      return (
        Object.keys(DefaultEvnMap).find(key =>
          DefaultEvnMap[key as Exclude<EnvEnum, EnvEnum.PROD>].some(curr =>
            host.includes(`-${curr}`),
          ),
        ) ?? EnvEnum.PROD
      );
    }
  }

  protected getUserId() {
    if (typeof this.options.getUserId === 'function') {
      return this.options.getUserId();
    } else if (typeof window === 'undefined' || !window.localStorage) {
      return '';
    } else {
      const userId = (
        window.localStorage.getItem(this.options.localstorageUserIdKey || 'lastUser') || ''
      ).replace(/@\w+.\w+$/, '');

      if (userId && /^[a-z]+\.[a-z]+\d{0,2}(\.o)*$/u.test(userId)) {
        return userId;
      }

      return '';
    }
  }
}
