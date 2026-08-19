import { Grid } from '@aurora/horizon-react';

export default function LayoutPlacementDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Grid
      aria-label={isEnglish ? 'Aligned metrics' : '对齐后的指标'}
      tag="section"
      cols={8}
      columnGap={12}
      rowGap={12}
      align="center"
      justify="stretch"
    >
      <Grid.Item span={3} style={{ padding: 12, background: 'var(--h-bg-secondary)' }}>
        {isEnglish ? 'Leading item' : '起始项'}
      </Grid.Item>
      <Grid.Item span={3} offset={2} style={{ padding: 12, background: 'var(--h-bg-secondary)' }}>
        {isEnglish ? 'Offset by two tracks' : '向后偏移两列'}
      </Grid.Item>
    </Grid>
  );
}
