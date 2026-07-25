import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

/**
 * Quill (react-quill) chrome — toolbar / container / editor surface.
 * Keeps nested selectors out of product modules that ban `sx`.
 */
export const ShRichTextEditorShellRoot = styled(Box, {
  shouldForwardProp: prop => prop !== 'minHeightPx',
})<{ minHeightPx?: number }>(({ theme, minHeightPx = 160 }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  overflow: 'hidden',
  /* Single outer border — avoid toolbar+container double edge at zoom (#359). */
  '& .ql-toolbar': {
    border: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
  },
  '& .ql-container': {
    border: 'none',
    borderRadius: 0,
    minHeight: minHeightPx,
    fontSize: theme.typography.body2.fontSize,
  },
  '& .ql-editor': {
    minHeight: minHeightPx,
  },
}));

export type ShRichTextEditorShellProps = Omit<BoxProps, 'minHeight'> & {
  children?: ReactNode;
  minHeightPx?: number;
};

export function ShRichTextEditorShell({ children, minHeightPx, ...rest }: ShRichTextEditorShellProps) {
  return (
    <ShRichTextEditorShellRoot minHeightPx={minHeightPx} {...rest}>
      {children}
    </ShRichTextEditorShellRoot>
  );
}
