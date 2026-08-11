import { useState } from 'react';
import { Segmented, SegmentedItem, Space } from '@aurora/horizon-web-react';

export default function SegmentedDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [view, setView] = useState('overview');
  return (
    <Space direction="vertical" size="large">
      <Segmented onChange={value => setView(String(value))} value={view}>
        <SegmentedItem value="overview">{en ? 'Overview' : '概览'}</SegmentedItem>
        <SegmentedItem value="tasks">{en ? 'Tasks' : '任务'}</SegmentedItem>
        <SegmentedItem value="files">{en ? 'Files' : '文件'}</SegmentedItem>
        <SegmentedItem disabled value="archive">
          {en ? 'Archive' : '归档'}
        </SegmentedItem>
      </Segmented>
      <p>{en ? `Active view: ${view}` : `当前视图：${view}`}</p>
      <Segmented block defaultValue="week" size="small">
        <SegmentedItem value="day">{en ? 'Day' : '日'}</SegmentedItem>
        <SegmentedItem value="week">{en ? 'Week' : '周'}</SegmentedItem>
        <SegmentedItem value="month">{en ? 'Month' : '月'}</SegmentedItem>
      </Segmented>
    </Space>
  );
}
