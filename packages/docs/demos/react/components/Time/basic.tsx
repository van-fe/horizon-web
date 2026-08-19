import { useState } from 'react';
import { Button, Space, Time } from '@aurora/horizon-react';

export default function TimeBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [key, setKey] = useState(0);
  const isEnglish = locale === 'en';
  return (
    <Space direction="vertical">
      <Time key={key} time={10} onFinished={() => undefined} />
      <Button size="small" onClick={() => setKey(value => value + 1)}>
        {isEnglish ? 'Restart' : '重新开始'}
      </Button>
    </Space>
  );
}
