import { Timeline, TimelineItem } from '@aurora/horizon-react';

export default function TimelineFoldingDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';

  return (
    <section className="docs-demo">
      <div className="docs-demo__stage">
        <Timeline aria-label={en ? 'Deployment checks' : '部署检查'}>
          <TimelineItem
            foldConfig={{
              number: 2,
              label: en ? 'Toggle two automated checks' : '展开或收起两条自动检查',
              content: en ? '2 automated checks' : '2 条自动检查',
              dot: { type: 'circle', size: 'large' },
            }}
            hiddenDot={<span aria-hidden="true">+2</span>}
            name={en ? 'Preflight checks' : '发布前检查'}
            timestamp="2026-08-14 09:00"
          />
          <TimelineItem
            description={en ? 'All artifacts are signed.' : '所有产物均已签名。'}
            name={en ? 'Signature verification' : '签名校验'}
            timestamp="2026-08-14 09:05"
          />
          <TimelineItem
            description={en ? 'No critical findings.' : '未发现严重问题。'}
            name={en ? 'Security scan' : '安全扫描'}
            timestamp="2026-08-14 09:08"
          />
          <TimelineItem
            description={en ? 'Ready for canary traffic.' : '可开始灰度流量。'}
            name={en ? 'Checks complete' : '检查完成'}
            tail={false}
            timestamp="2026-08-14 09:12"
          />
        </Timeline>
      </div>
    </section>
  );
}
