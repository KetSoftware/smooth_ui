import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

export type ShResponsiveCardGridMaxColumns = 2 | 3 | 4;

/**
 * Responsive course/card grid with equal column tracks and consistent gaps.
 * - columns={4} (default / learning paths): 1 → 2 (md) → 4 (lg+)
 * - columns={2|3}: that many columns from md up
 * - Always `repeat(N, minmax(0, 1fr))` + gap — cards fill their cell; no maxWidth
 *   holes and no space-between packing that leaves empty voids in a partial row
 */
export const ShResponsiveCardGridRoot = styled(Box, {
  shouldForwardProp: prop => prop !== 'maxColumns' && prop !== 'columns',
})<{ maxColumns?: ShResponsiveCardGridMaxColumns; columns?: ShResponsiveCardGridMaxColumns }>(
  ({ theme, maxColumns, columns }) => {
    const cap = columns ?? maxColumns ?? 4;
    const fixedDesktop = cap <= 3;
    const mdCols = fixedDesktop ? cap : Math.min(2, cap);
    const lgCols = fixedDesktop ? cap : cap;
    const xlCols = cap;
    const track = (n: number) => `repeat(${n}, minmax(0, 1fr))`;
    return {
      display: 'grid',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box' as const,
      gridTemplateColumns: 'minmax(0, 1fr)',
      justifyContent: 'start' as const,
      justifyItems: 'stretch' as const,
      /* Spacing tokens: 8px mobile → 12px md+ */
      gap: theme.spacing(1),
      '& > *': {
        minWidth: 0,
        width: '100%',
        maxWidth: '100%',
        justifySelf: 'stretch',
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: track(mdCols),
        gap: theme.spacing(1.5),
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: track(lgCols),
      },
      [theme.breakpoints.up('xl')]: {
        gridTemplateColumns: track(xlCols),
      },
    };
  }
);

export type ShResponsiveCardGridProps = BoxProps & {
  children?: ReactNode;
  /** Desktop max columns (default 4). Certificates use 3. Alias of `columns`. */
  maxColumns?: ShResponsiveCardGridMaxColumns;
  /** Alias for maxColumns — e.g. columns={3} for certs. */
  columns?: ShResponsiveCardGridMaxColumns;
};

export function ShResponsiveCardGrid({
  children,
  maxColumns,
  columns,
  ...rest
}: ShResponsiveCardGridProps) {
  const cap = columns ?? maxColumns ?? 4;
  return (
    <ShResponsiveCardGridRoot maxColumns={cap} columns={columns} {...rest}>
      {children}
    </ShResponsiveCardGridRoot>
  );
}
