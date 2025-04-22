export interface ConfigType {
  /**
   * 获取用户域账号的方法
   */
  getUserId?: () => string;
  /**
   * 存储在 localstorage 中用户域账号的key
   * 在getUserId没有传入的时候使用此项
   * @default 'lastUser'
   */
  localstorageUserIdKey?: string;
  /**
   * 获取当前运行环境的方法
   * @return dev | test | stg | prod
   */
  getCurrentEnv?: () => EnvEnum | string;
  /**
   * 神策配置
   */
  sensorConfig: {
    /**
     * 基础项
     */
    basic?: {
      /**
       * 你的项目name
       * 对于所有中台项目，dev/test/stg 都是 nio_business_test; prod 是 nio_business_prod
       * 会自动根据 getCurrentEnv 返回的值判断，如与预期不符，需要自己设置
       */
      project?: string;
    };
    /**
     * 用于 sensors.init 传入的参数
     * 会自动将 key 改为 snakeCase 模式
     * e.g: nioWebsite => nio_website
     */
    extra?: Record<string, unknown>;
    /**
     * 以下值将会传入 sensors.registerPage
     */
    params?: {
      /**
       * 你的应用 appid
       */
      appId?: string | (() => string);
      /**
       * 当前应用平台
       */
      platformType?: 'web' | 'android' | 'ios' | 'mini_program' | string;
      /**
       * 当前语言
       */
      language?: 'zh-CN' | 'en-US' | 'nb-NO' | string;
      /**
       * 当前地区
       */
      region?: 'CN' | 'NB' | string;
      /**
       * 当前设备id
       */
      deviceId?: string | (() => string);
      /**
       * 其余参数的 key 也会被转为 snakeCase 模式
       */
      [index: string]: string | undefined | Function;
    };
  };
}

export enum EnvEnum {
  DEV = 'dev',
  TEST = 'test',
  STG = 'stg',
  PROD = 'prod',
}

export const DefaultEvnMap: Record<Exclude<EnvEnum, EnvEnum.PROD>, string[]> = {
  dev: ['qa', 'dev', 'local'],
  test: ['sit', 'test'],
  stg: ['stg'],
};
