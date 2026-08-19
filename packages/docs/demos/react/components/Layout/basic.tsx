import { Grid, GridItem } from '@aurora/horizon-react';

const cellStyle = {
  minHeight: 72,
  padding: 12,
  borderRadius: 6,
  color: 'var(--h-text-primary)',
  background: 'var(--h-bg-secondary)',
};

export default function LayoutBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const labels =
    locale === 'en' ? ['Quarter', 'Half', 'Quarter'] : ['四分之一', '二分之一', '四分之一'];
  return (
    <Grid cols={24} gap={12}>
      <GridItem span={6} style={cellStyle}>
        {labels[0]}
      </GridItem>
      <GridItem span={12} style={cellStyle}>
        {labels[1]}
      </GridItem>
      <GridItem span={6} style={cellStyle}>
        {labels[2]}
      </GridItem>
    </Grid>
  );
}
