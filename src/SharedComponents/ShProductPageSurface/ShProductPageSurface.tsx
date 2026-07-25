import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

/**
 * Opaque white product page surface — only breadcrumbs sit on the raw AppLightBackground.
 */
export const ShProductPageSurfaceRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: theme.spacing(2.5, 2.5, 4),
  backgroundColor: '#ffffff',
  backgroundImage: 'none',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  boxShadow: 'none',
  isolation: 'isolate',
}));

export type ShProductPageSurfaceProps = BoxProps & {
  children?: ReactNode;
};

export function ShProductPageSurface({ children, ...rest }: ShProductPageSurfaceProps) {
  return <ShProductPageSurfaceRoot {...rest}>{children}</ShProductPageSurfaceRoot>;
}
