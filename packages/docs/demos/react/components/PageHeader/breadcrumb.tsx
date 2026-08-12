import { Breadcrumb, PageHeader } from '@aurora/horizon-web-react';

export default function PageHeaderBreadcrumbDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <PageHeader
      breadcrumb={
        <Breadcrumb
          items={[
            { text: en ? 'Workspaces' : '工作区' },
            { text: 'Horizon Web' },
            { text: en ? 'Releases' : '发布' },
            { text: en ? 'August' : '八月', title: true },
          ]}
        />
      }
      content={en ? 'Validation and rollout checklist' : '验证与发布检查清单'}
      showBack={false}
      title={en ? 'August release plan' : '八月发布计划'}
    />
  );
}
