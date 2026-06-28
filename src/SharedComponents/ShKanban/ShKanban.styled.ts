import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const KanbanBoardRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  paddingBottom: theme.spacing(1),
  minHeight: 420,
}));

export const KanbanColumnRoot = styled(Box)(({ theme }) => ({
  minWidth: 280,
  maxWidth: 320,
  flex: '0 0 280px',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '70vh',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export const KanbanColumnHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const KanbanColumnTitle = styled(Typography)(() => ({
  fontWeight: 600,
}));

export const KanbanColumnCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const KanbanColumnBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  flex: 1,
}));

export const KanbanCardRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  cursor: 'pointer',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

export const KanbanCardTitle = styled(Typography)(() => ({
  fontWeight: 600,
}));

export const KanbanCardSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

export const KanbanCardMeta = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
}));
