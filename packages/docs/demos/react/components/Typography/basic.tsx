import { useState } from 'react';
import { Space, Typography } from '@aurora/horizon-web-react';

export default function TypographyDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  const [value, setValue] = useState(isEnglish ? 'Editable project title' : '可编辑的项目标题');
  return (
    <Space direction="vertical" size="medium">
      <Typography level={2}>{isEnglish ? 'Typography heading' : '排版标题'}</Typography>
      <Typography variant="secondary">
        {isEnglish ? 'Secondary supporting text' : '次要辅助文本'}
      </Typography>
      <Typography code>pnpm add @aurora/horizon-web-react</Typography>
      <Typography copyable editable onValueChange={setValue} value={value} weight="semibold" />
      <Typography ellipsis style={{ maxWidth: 280 }}>
        {isEnglish
          ? 'A long sentence can be truncated when the available space is limited.'
          : '当可用空间有限时，较长的文本内容可以自动省略。'}
      </Typography>
    </Space>
  );
}
