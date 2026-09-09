import { Tag, TagGroup } from '@aurora/horizon-react';

export default function Demo() {
  return (
    <div style={{ maxWidth: 360 }}>
      <TagGroup collapse collapseUseTooltip expand minDisplayed={3} separator=" · ">
        {['Design system', 'Frontend', 'Accessibility', 'Quality', 'Documentation', 'Release'].map(
          tag => (
            <Tag key={tag}>{tag}</Tag>
          ),
        )}
      </TagGroup>
    </div>
  );
}
