import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { WhiteColor } from '../../shStyleExports';

export const UserNameStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#192A3E' : WhiteColor,
  fontWeight: '600',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '100%',
}));

export const UserEmailStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#90A0B7' : WhiteColor,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: '400',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '100%',
}));
