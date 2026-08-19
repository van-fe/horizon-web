import { useState } from 'react';
import type { TabsKey } from '@aurora/horizon-react';
import { Tab, Tabs } from '@aurora/horizon-react';

export default function TabsBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [activeKey, setActiveKey] = useState<TabsKey>('overview');
  const views = [
    {
      key: 'overview',
      label: en ? 'Overview' : '概览',
      detail: en ? 'Current project health and recent activity.' : '查看当前项目健康度与近期动态。',
    },
    {
      key: 'members',
      label: en ? 'Members' : '成员',
      detail: en ? 'Manage roles and workspace access.' : '管理角色与工作区权限。',
    },
    {
      key: 'billing',
      label: en ? 'Billing' : '账单',
      detail: en ? 'Review invoices and payment settings.' : '查看发票与付款设置。',
    },
  ];
  const active = views.find(view => view.key === activeKey)!;

  return (
    <section className="docs-demo">
      <Tabs onChange={setActiveKey} value={activeKey}>
        {views.map(view => (
          <Tab key={view.key} label={view.label} value={view.key} />
        ))}
      </Tabs>
      <p aria-live="polite" className="docs-demo__status">
        {active.detail}
      </p>
    </section>
  );
}
