import { Grid, GridItem } from '@aurora/horizon-web-react';

const itemStyle = {
  minHeight: 64,
  padding: 12,
  border: '1px solid var(--h-divider-default)',
  borderRadius: 6,
};

export default function LayoutResponsiveDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <Grid cols={{ xs: 1, sm: 2, md: 12 }} gap={{ xs: 8, md: 16 }}>
      <GridItem span={{ xs: 1, md: 4 }} style={itemStyle}>
        {isEnglish ? 'Overview' : '概览'}
      </GridItem>
      <GridItem span={{ xs: 1, md: 5 }} style={itemStyle}>
        {isEnglish ? 'Activity' : '动态'}
      </GridItem>
      <GridItem span={{ xs: 1, md: 3 }} style={itemStyle}>
        {isEnglish ? 'Actions' : '操作'}
      </GridItem>
    </Grid>
  );
}
