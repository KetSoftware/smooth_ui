import { TableCell, TableSortLabel, type TableCellProps } from '@mui/material';
import type { ReactNode } from 'react';

export type SortDirection = 'asc' | 'desc';

export type ShSortableTableHeaderProps = {
  /** Column id sent to the server as sort field. */
  sortKey: string;
  label: ReactNode;
  activeSortKey?: string | null;
  direction?: SortDirection | null;
  onSort: (sortKey: string, direction: SortDirection) => void;
  /** When true, third click clears sort (calls onClear). */
  clearable?: boolean;
  onClear?: () => void;
  /** Direction used on first activation (default asc). */
  initialDirection?: SortDirection;
  id?: string;
  align?: TableCellProps['align'];
  width?: number | string;
  disabled?: boolean;
  className?: string;
  /** Extra data attributes for sticky/layout helpers. */
  'data-sticky'?: string;
};

/**
 * ATS-style sortable column header: TableSortLabel in TableCell.
 * Parent owns server `sort`/`order` query params and refetch.
 */
export const ShSortableTableHeader = ({
  sortKey,
  label,
  activeSortKey,
  direction = 'asc',
  onSort,
  clearable,
  onClear,
  initialDirection = 'asc',
  id,
  align,
  width,
  disabled,
  className,
  'data-sticky': dataSticky,
}: ShSortableTableHeaderProps) => {
  const active = activeSortKey === sortKey;
  const sortDirection = active && direction ? direction : false;
  const ariaSort =
    active && direction === 'asc' ? 'ascending' : active && direction === 'desc' ? 'descending' : 'none';

  const handleClick = () => {
    if (disabled) return;
    if (!active) {
      onSort(sortKey, initialDirection);
      return;
    }
    if (direction === initialDirection) {
      onSort(sortKey, initialDirection === 'asc' ? 'desc' : 'asc');
      return;
    }
    if (clearable && onClear) {
      onClear();
      return;
    }
    onSort(sortKey, initialDirection);
  };

  return (
    <TableCell
      sortDirection={sortDirection}
      aria-sort={ariaSort}
      align={align}
      width={width}
      className={className}
      data-sticky={dataSticky}
    >
      <TableSortLabel
        id={id}
        active={active}
        direction={active && direction ? direction : initialDirection}
        disabled={disabled}
        onClick={handleClick}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
};
