import { Box, useTheme } from '@mui/material';
import type { ShBrandIconWrapProps } from './ShAppPortal.types';

const LIGHT_SWATCHES: Record<string, { bg: string; fg: string; border: string }> = {
  ats: { bg: '#E3F2FD', fg: '#1565C0', border: '#90CAF9' },
  hrms: { bg: '#E8F5E9', fg: '#2E7D32', border: '#A5D6A7' },
  lms: { bg: '#FFF3E0', fg: '#EF6C00', border: '#FFCC80' },
  default: { bg: '#F5F5F5', fg: '#616161', border: '#E0E0E0' },
};

const DARK_SWATCHES: Record<string, { bg: string; fg: string; border: string }> = {
  ats: { bg: '#0D2744', fg: '#90CAF9', border: '#1565C0' },
  hrms: { bg: '#1B3320', fg: '#A5D6A7', border: '#2E7D32' },
  lms: { bg: '#3E2723', fg: '#FFCC80', border: '#EF6C00' },
  default: { bg: '#2A2A2A', fg: '#BDBDBD', border: '#424242' },
};

export function ShBrandIconWrap({ iconSize = 'md', accentKey, children }: ShBrandIconWrapProps) {
  const theme = useTheme();
  const sizes = { sm: 28, md: 36, lg: 40 } as const;
  const size = sizes[iconSize];
  const palette = theme.palette.mode === 'dark' ? DARK_SWATCHES : LIGHT_SWATCHES;
  const swatch = palette[accentKey ?? 'default'] ?? palette.default;

  return (
    <Box
      width={size}
      height={size}
      borderRadius={1}
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexShrink={0}
      color={swatch.fg}
      bgcolor={swatch.bg}
      border={`1px solid ${swatch.border}`}
    >
      {children}
    </Box>
  );
}
