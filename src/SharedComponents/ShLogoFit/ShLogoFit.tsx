import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

/** Contains a logo `<img>` with object-fit contain (nested selector — no `sx` at call site). */
export const ShLogoFitRoot = styled(Box)({
  '& img': {
    maxHeight: '100%',
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
  },
});

export type ShLogoFitProps = BoxProps & { children?: ReactNode };

export function ShLogoFit({ children, ...rest }: ShLogoFitProps) {
  return <ShLogoFitRoot {...rest}>{children}</ShLogoFitRoot>;
}
