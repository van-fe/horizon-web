import { Timeline, TimelineItem } from '@aurora/horizon-react';

export default function TimelineBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const milestones = en
    ? [
        ['Requirements approved', '2026-08-12 09:30', 'Scope and owners are confirmed.'],
        ['Release candidate', '2026-08-13 16:20', 'Build and signature checks passed.'],
        ['Production rollout', '2026-08-14 18:30', 'All regions are healthy.'],
      ]
    : [
        ['需求通过', '2026-08-12 09:30', '范围和负责人已确认。'],
        ['发布候选版', '2026-08-13 16:20', '构建与签名检查已通过。'],
        ['全量上线', '2026-08-14 18:30', '各区域运行正常。'],
      ];

  return (
    <section className="docs-demo">
      <div className="docs-demo__stage">
        <Timeline aria-label={en ? 'Release milestones' : '发布里程碑'}>
          {milestones.map(([name, timestamp, description], index) => (
            <TimelineItem
              description={description}
              format="YYYY-MM-DD HH:mm"
              key={name}
              name={name}
              size={index === 1 ? 'large' : 'medium'}
              tail={index < milestones.length - 1}
              timestamp={timestamp}
              type={index === 1 ? 'circle' : 'disc'}
            />
          ))}
        </Timeline>
      </div>
    </section>
  );
}
