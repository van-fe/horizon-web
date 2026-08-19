import { useState } from 'react';
import { Breadcrumb, HorizonWebProvider } from '@aurora/horizon-react';

export default function BreadcrumbNavigationDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [destination, setDestination] = useState(en ? 'Current page' : '当前页面');
  const items = [
    { text: en ? 'Projects' : '项目', to: 'projects' },
    { text: en ? 'Horizon Web' : 'Horizon Web', to: 'horizon-web' },
    { text: en ? 'Breadcrumb' : '面包屑', to: 'breadcrumb', replace: true, title: true },
  ];

  return (
    <HorizonWebProvider
      breadcrumbLabels={{ collapsed: en ? 'Show hidden levels' : '显示隐藏层级' }}
      navigate={(to, options) =>
        setDestination(
          `${options.replace ? (en ? 'Replace' : '替换') : en ? 'Navigate' : '导航'}: ${String(to)}`,
        )
      }
      resolveHref={to => `/workspace/${String(to)}`}
    >
      <section className="docs-demo">
        <p className="docs-demo__description">
          {en
            ? 'Each route keeps an href while navigation is handled by the nearest provider.'
            : '每个路由条目都保留 href，并由最近的 Provider 处理导航。'}
        </p>
        <Breadcrumb items={items} />
        <span aria-live="polite" className="docs-demo__status">
          {destination}
        </span>
      </section>
    </HorizonWebProvider>
  );
}
