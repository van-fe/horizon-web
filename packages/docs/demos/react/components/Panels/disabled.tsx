import { Panel, Panels } from '@aurora/horizon-web-react';

export default function PanelsDisabledDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';

  return (
    <div style={{ width: 'min(100%, 390px)' }}>
      <Panels value="ready">
        <Panel name="ready">
          {en
            ? 'Long localized content stays inside a narrow panel without horizontal overflow.'
            : '较长的本地化内容在窄面板中仍会自动换行，不产生横向溢出。'}
        </Panel>
        <Panel disabled name="archived">
          {en ? 'Archived content' : '已归档内容'}
        </Panel>
      </Panels>
    </div>
  );
}
