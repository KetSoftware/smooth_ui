import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

/**
 * In-surface sticky page toolbar (must live inside ShProductPageSurface).
 * White only — not a grey headerSection band.
 */
export const ShProductPageHeaderRoot = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
  flexWrap: 'wrap',
  margin: theme.spacing(-2.5, -2.5, 1.5),
  padding: theme.spacing(1.5, 2.5, 1.75),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#ffffff',
  backgroundImage: 'none',
}));

export type ShProductPageHeaderProps = BoxProps & {
  children?: ReactNode;
};

export function ShProductPageHeader({ children, ...rest }: ShProductPageHeaderProps) {
  return <ShProductPageHeaderRoot {...rest}>{children}</ShProductPageHeaderRoot>;
}
