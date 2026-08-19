import { Application, Button, useHorizonWebConfig } from '@aurora/horizon-react';

function ConfigurationSummary() {
  const config = useHorizonWebConfig();
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Button>{config.locale === 'zh-CN' ? '保存设置' : 'Save settings'}</Button>
      <output>
        namespace={config.namespace}; size={config.size}; timezone=
        {JSON.stringify(config.showTimeZone)}
      </output>
    </div>
  );
}

export default function ApplicationBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  return (
    <Application
      locale={locale === 'zh' ? 'zh-CN' : 'en-US'}
      namespace="H"
      showTimeZone={['timeline']}
      size="small"
    >
      <ConfigurationSummary />
    </Application>
  );
}
