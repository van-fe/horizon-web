import type { App, InjectionKey } from 'vue';
import type { LegoOption } from '../../makeInstaller';
import LegoSensorTracker from '@nio-fe/lego-sensor-tracker';
import { generatorInjectedKeyName } from '@nio-fe/shared';
import { ref } from 'vue';
import deepmerge from 'deepmerge';

export const sensorInjectKey = Symbol(
  generatorInjectedKeyName('sensor', 'tracker instance'),
) as InjectionKey<LegoSensorTracker>;

export const sensorTracker = ref<LegoSensorTracker>();

export default function sensorProvider(app: App, options?: LegoOption): App {
  try {
    LegoSensorTracker.create(
      deepmerge(
        {
          sensorConfig: {
            extra: {
              isTrackSinglePage: true,
              useClientTime: true,
              sendType: 'beacon',
            },
          },
        },
        options?.sensor || {},
      ),
    )
      .then(legoSensorTracker => {
        legoSensorTracker.mixinTracker(app);

        sensorTracker.value = legoSensorTracker;
        app.provide(sensorInjectKey, legoSensorTracker);
      })
      .catch(e => {
        console.info((e as unknown as Error)?.message);
      });
  } catch (e) {
    console.info((e as unknown as Error)?.message);
  }

  return app;
}
