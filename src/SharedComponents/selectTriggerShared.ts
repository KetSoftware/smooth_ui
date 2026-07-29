import { Box, styled, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { PrimaryThemeColor } from '../SharedStyles/styleConstants';

export type SelectFieldDensity = 'default' | 'compact' | 'dense';

const triggerLayoutByDensity: Record<SelectFieldDensity, { padding: string; minHeight: string }> = {
  default: { padding: '7px 14px', minHeight: '36px' },
  compact: { padding: '5px 10px', minHeight: '32px' },
  dense: { padding: '4px 10px', minHeight: '28px' },
};

export const TriggerChipArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  gap: theme.spacing(0.5),
  overflow: 'visible',
}));

export const getSelectChipSx = (theme: Theme, hasAvatar: boolean) => ({
  height: hasAvatar ? 22 : 20,
  maxHeight: hasAvatar ? 22 : 20,
  borderRadius: '5px',
  fontWeight: 500,
  fontSize: '12px',
  backgroundColor: alpha(PrimaryThemeColor, theme.palette.mode === 'light' ? 0.1 : 0.18),
  color: PrimaryThemeColor,
  border: `1px solid ${alpha(PrimaryThemeColor, 0.24)}`,
  '& .MuiChip-label': {
    paddingLeft: hasAvatar ? theme.spacing(0.5) : theme.spacing(1),
    paddingRight: theme.spacing(0.75),
    lineHeight: 1.2,
  },
  '& .MuiChip-avatar': {
    width: 14,
    height: 14,
    marginLeft: theme.spacing(0.75),
    marginRight: theme.spacing(0.5),
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '& .MuiSvgIcon-root': {
      fontSize: 12,
      width: 12,
      height: 12,
    },
  },
  '& .MuiChip-deleteIcon': {
    fontSize: 16,
    margin: theme.spacing(0, 0.25, 0, 0),
    color: alpha(PrimaryThemeColor, 0.65),
    '&:hover': { color: PrimaryThemeColor },
  },
});

export const getSelectTriggerRootSx = (disabled: boolean, density: SelectFieldDensity = 'default') => {
  const layout = triggerLayoutByDensity[density];

  return {
    flexWrap: 'wrap',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    overflow: 'visible',
    padding: `${layout.padding} !important`,
    minHeight: `${layout.minHeight} !important`,
    boxSizing: 'border-box',
    '& .MuiInputAdornment-root': {
      margin: 0,
      height: 'auto',
      maxHeight: 'none',
      alignSelf: 'center',
    },
  };
};

export const getSelectTriggerFieldSx = () => ({
  '&& .MuiOutlinedInput-input': {
    width: 0,
    minWidth: 0,
    padding: '0 !important',
    opacity: 0,
  },
});
