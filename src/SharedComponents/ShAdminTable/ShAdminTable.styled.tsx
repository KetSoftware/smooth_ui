import { styled } from '@mui/material';
import { LightModeBackground, PrimaryThemeColor } from '../../shStyleExports';

export const SHTableLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.mode === 'light' ? PrimaryThemeColor : LightModeBackground,
  ':hover': {
    textDecoration: 'underline',
  },
}));
