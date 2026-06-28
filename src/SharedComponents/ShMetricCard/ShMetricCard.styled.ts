import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MetricCardRoot = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export const MetricLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

export const MetricValue = styled(Typography)(() => ({
  fontWeight: 700,
}));

export const MetricFooter = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
