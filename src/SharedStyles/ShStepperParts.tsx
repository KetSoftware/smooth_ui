import { Box, StepConnector, stepConnectorClasses, styled } from '@mui/material';
import { BorderColorDark, PrimaryThemeColor, ShBorderRadius } from './styleConstants';

export const ShStepperConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 135deg, ${PrimaryThemeColor} 0%, ${PrimaryThemeColor} 20%, ${PrimaryThemeColor} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 135deg, ${PrimaryThemeColor} 0%, ${PrimaryThemeColor} 20%, ${PrimaryThemeColor} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

export const ShStepperIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient( 135deg, ${PrimaryThemeColor} 0%, ${PrimaryThemeColor} 20%, ${PrimaryThemeColor} 100%)`,
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient( 135deg, ${PrimaryThemeColor} 0%, ${PrimaryThemeColor} 20%, ${PrimaryThemeColor} 100%)`,
  }),
}));

export const ShCandidateResumeDropZone = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  cursor: 'pointer',
  minHeight: '100px',
  width: '100%',
  borderRadius: ShBorderRadius,
  border: `1px dashed ${BorderColorDark}`,
  position: 'relative',
  '& .MuiButton-root': {
    width: '100%',
    minHeight: '100px',
  },
  '& input': {
    display: 'none',
  },
}));
