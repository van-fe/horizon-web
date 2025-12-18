import { debug } from '@nio-fe/shared';
import { reject } from 'lodash';

export interface DBSavedDataType {
  name: string;
  version: string;
  path: string;
}

export default class Store {
  private request!: IDBOpenDBRequest;
  private db: IDBDatabase | undefined;
  private dbName = 'plugin-usage';
  private data: unknown[] = [];

  static async create(collectionName = 'lego-sensor-tracker', version = 1) {
    const store = new Store();

    await store.createDb(collectionName, version);

    return store;
  }

  constructor() {
    if (!window.indexedDB) {
      console.error(
        `Your browser doesn't support indexedDB. So the SensorTracker will not run correctly. The usage will not be tracked.`,
      );
    }
  }

  private createDb(collectionName: string, version: number) {
    return new Promise(resolve => {
      this.request = window.indexedDB.open(collectionName, version);

      this.request.onerror = evt => {
        debug(evt);
        reject(evt);
      };

      this.request.onsuccess = () => {
        debug(`open ${collectionName} indexedBD collection success!`);

        this.db = this.request.result;

        this.db.onclose = () => {
          debug('The DB is closed.');
          this.db = undefined;
        };

        resolve(true);
      };

      this.request.onupgradeneeded = () => {
        const db = this.request.result;

        if (!db.objectStoreNames.contains(this.dbName)) {
          db.createObjectStore(this.dbName, { keyPath: ['name', 'version', 'path'] });
        }

        // inorder to clear needed stored data which pass in before database created.
        void this.add();
      };
    });
  }

  public selectDb(dbName: string) {
    this.dbName = dbName;

    return this;
  }

  private createDbStore(mode: IDBTransactionMode = 'readwrite') {
    return this.db?.transaction([this.dbName], mode).objectStore(this.dbName);
  }

  public async add(...dataList: DBSavedDataType[]) {
    if (!this.db) {
      this.data.push(...dataList);
    } else {
      return Promise.all(
        [...this.data, ...dataList].map(data => {
          return new Promise((resolve, reject) => {
            const request = this.createDbStore('readwrite')?.add(data);

            if (request) {
              request.onsuccess = () => {
                resolve(request?.result);
              };

              request.onerror = evt => {
                reject((evt?.target as unknown as IDBRequest)?.error);
              };
            } else {
              reject(new Error('Cannot open db store!'));
            }
          });
        }),
      );
    }
  }

  public get(name: string, path: string, version: string) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error('No DB create'));
      }

      const store = this.createDbStore();

      if (store) {
        const request = store.get([name, version, path]);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(request.result);
        };
      }
    });
  }

  public del(name: string, path: string, version: string) {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error('No Db create'));
      }

      const store = this.createDbStore('readwrite');

      if (store) {
        const request = store.delete([name, version, path]);

        request.onsuccess = () => {
          if (request.result) {
          } else {
            reject(new Error('Not Found'));
          }
        };

        request.onerror = () => {
          reject(new Error('Not Found'));
        };
      }
    });
  }

  public clear() {
    return this.createDbStore()?.clear();
  }
}
