import { Application, useHorizonWebConfig } from '@aurora/horizon-react';

function ScopeSummary({ label }: { label: string }) {
  const config = useHorizonWebConfig();
  return <output>{`${label}: ${config.locale} / ${config.size} / ${config.namespace}`}</output>;
}

export default function ApplicationNestedDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Application locale={isEnglish ? 'en-US' : 'zh-CN'} namespace="Workspace" size="large">
      <div style={{ display: 'grid', gap: 12 }}>
        <ScopeSummary label={isEnglish ? 'Outer' : '外层'} />
        <Application size="small">
          <ScopeSummary label={isEnglish ? 'Nested' : '内层'} />
        </Application>
      </div>
    </Application>
  );
}
