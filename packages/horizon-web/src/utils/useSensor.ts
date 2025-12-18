import { sensorTracker } from '~/provides/sensor';

export function useSensor(name: string, options: any, type: 'method' | 'directive') {
  if (sensorTracker.value) {
    sensorTracker.value.emit(type, name, options);
  }
}
