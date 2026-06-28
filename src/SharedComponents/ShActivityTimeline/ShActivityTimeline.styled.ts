import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TimelineRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const TimelineItemRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  position: 'relative',
}));

export const TimelineDot = styled(Box)(({ theme }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  marginTop: theme.spacing(0.75),
  flexShrink: 0,
  backgroundColor: theme.palette.primary.main,
}));

export const TimelineContent = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}));

export const TimelineTitle = styled(Typography)(() => ({
  fontWeight: 600,
}));

export const TimelineMeta = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const TimelineBody = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  whiteSpace: 'pre-wrap',
}));
