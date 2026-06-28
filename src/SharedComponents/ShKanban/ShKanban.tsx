import type { ReactNode } from 'react';
import {
  KanbanBoardRoot,
  KanbanCardMeta,
  KanbanCardRoot,
  KanbanCardSubtitle,
  KanbanCardTitle,
  KanbanColumnBody,
  KanbanColumnCount,
  KanbanColumnHeader,
  KanbanColumnRoot,
  KanbanColumnTitle,
} from './ShKanban.styled';

export type ShKanbanBoardProps = {
  children: ReactNode;
};

export const ShKanbanBoard = ({ children }: ShKanbanBoardProps) => <KanbanBoardRoot>{children}</KanbanBoardRoot>;

export type ShKanbanColumnProps = {
  title: string;
  count?: number;
  headerAction?: ReactNode;
  children: ReactNode;
};

export const ShKanbanColumn = ({ title, count, headerAction, children }: ShKanbanColumnProps) => (
  <KanbanColumnRoot>
    <KanbanColumnHeader>
      <KanbanColumnTitle variant="subtitle2">{title}</KanbanColumnTitle>
      <KanbanColumnCount variant="caption">{count ?? 0}</KanbanColumnCount>
      {headerAction}
    </KanbanColumnHeader>
    <KanbanColumnBody>{children}</KanbanColumnBody>
  </KanbanColumnRoot>
);

export type ShKanbanCardProps = {
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  onClick?: () => void;
};

export const ShKanbanCard = ({ title, subtitle, meta, onClick }: ShKanbanCardProps) => (
  <KanbanCardRoot onClick={onClick}>
    <KanbanCardTitle variant="body2">{title}</KanbanCardTitle>
    {subtitle ? <KanbanCardSubtitle variant="caption">{subtitle}</KanbanCardSubtitle> : null}
    {meta ? <KanbanCardMeta>{meta}</KanbanCardMeta> : null}
  </KanbanCardRoot>
);
