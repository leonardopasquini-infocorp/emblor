import React from 'react';
import { type Tag as TagType } from './tag-input';
import { Tag, TagProps } from './tag';
import { cn } from '@/lib/utils';

export type TagListProps = {
  tags: TagType[];
  customTagRenderer?: (tag: TagType) => React.ReactNode;
  direction?: TagProps['direction'];
  onSortEnd: (oldIndex: number, newIndex: number) => void;
} & Omit<TagProps, 'tagObj'>;

const DropTarget: React.FC = () => {
  return <div className={cn('h-full rounded-md bg-secondary/50')} />;
};

export const TagList: React.FC<TagListProps> = ({
  tags,
  customTagRenderer,
  direction,
  draggable,
  onSortEnd,
  ...tagListProps
}) => {
  const [draggedTagId, setDraggedTagId] = React.useState<string | null>(null);

  const handleMouseDown = (id: string) => {
    setDraggedTagId(id);
  };

  const handleMouseUp = () => {
    setDraggedTagId(null);
  };

  return (
    <div
      className={cn('rounded-md max-w-[450px]', {
        'flex flex-wrap gap-2': direction === 'row',
        'flex flex-col gap-2': direction === 'column',
      })}
    >
      {tags.map((tagObj) =>
        customTagRenderer ? customTagRenderer(tagObj) : <Tag key={tagObj.id} tagObj={tagObj} {...tagListProps} />,
      )
      }
    </div>
  );
};
