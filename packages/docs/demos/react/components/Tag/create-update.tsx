import { useState } from 'react';
import { Tag, TagGroup } from '@aurora/horizon-react';

export default function Demo() {
  const [tags, setTags] = useState(['Aurora', 'React']);
  return (
    <TagGroup
      beforeCreate={value => value.length <= 16 && !tags.includes(value)}
      beforeEdit={(value, oldValue) => value !== oldValue && !tags.includes(value)}
      editable
      onClosed={id => setTags(current => current.filter(value => value !== id))}
      onCreated={value => setTags(current => [...current, value])}
      onEdited={(value, oldValue) =>
        setTags(current => current.map(item => (item === oldValue ? value : item)))
      }
      useCreate
    >
      {tags.map(tag => (
        <Tag closable id={tag} key={tag}>
          {tag}
        </Tag>
      ))}
    </TagGroup>
  );
}
