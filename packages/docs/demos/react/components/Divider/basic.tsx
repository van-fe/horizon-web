import { Divider } from '@aurora/horizon-web-react';

export default function DividerDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';

  return (
    <div className="docs-demo">
      <p>{isEnglish ? 'Project overview' : '项目概览'}</p>
      <Divider>{isEnglish ? 'Recent activity' : '最近动态'}</Divider>
      <p>{isEnglish ? 'Design review completed · 14:30' : '设计评审已完成 · 14:30'}</p>
      <Divider lineStyle="dashed" titlePlacement="left" variant="strong">
        {isEnglish ? 'Participants' : '参与成员'}
      </Divider>
      <p>{isEnglish ? 'Design · Engineering · Product' : '设计 · 研发 · 产品'}</p>
    </div>
  );
}
