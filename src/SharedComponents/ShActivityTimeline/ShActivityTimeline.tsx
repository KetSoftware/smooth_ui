import type { ReactNode } from 'react';
import {
  TimelineBody,
  TimelineContent,
  TimelineDot,
  TimelineItemRoot,
  TimelineMeta,
  TimelineRoot,
  TimelineTitle,
} from './ShActivityTimeline.styled';

export type ShActivityTimelineItem = {
  id: string | number;
  title: string;
  meta?: string;
  body?: string;
  icon?: ReactNode;
};

export type ShActivityTimelineProps = {
  items: ShActivityTimelineItem[];
};

export const ShActivityTimeline = ({ items }: ShActivityTimelineProps) => (
  <TimelineRoot>
    {items.map(item => (
      <TimelineItemRoot key={item.id}>
        {item.icon ?? <TimelineDot />}
        <TimelineContent>
          <TimelineTitle variant="body2">{item.title}</TimelineTitle>
          {item.meta ? <TimelineMeta variant="caption">{item.meta}</TimelineMeta> : null}
          {item.body ? <TimelineBody variant="body2">{item.body}</TimelineBody> : null}
        </TimelineContent>
      </TimelineItemRoot>
    ))}
  </TimelineRoot>
);
