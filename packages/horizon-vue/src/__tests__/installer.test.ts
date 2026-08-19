import { createApp, defineComponent } from 'vue';
import install, { HCascader, HTagGroup } from '../index';

describe('Horizon Web installer', () => {
  test('does not read component exports before the package entry is initialized', () => {
    expect(HCascader).toBeDefined();
    expect(HTagGroup).toBeDefined();
  });

  test('resolves and registers components when installed', () => {
    const app = createApp(defineComponent(() => () => null));

    app.use(install);

    expect(app.component(HCascader.name!)).toBe(HCascader);
    expect(app.component(HTagGroup.name!)).toBe(HTagGroup);
  });
});
