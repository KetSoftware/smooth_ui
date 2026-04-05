import { Box, keyframes, styled } from '@mui/material';

const loadingAnimation = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1); }
  100% { transform: scale(0); }
`;

export const ShLoadingDotsBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  gap: theme.spacing(1),
  zIndex: 1,
  backgroundColor: theme.palette.background.default,
  '&.positive': {
    '& .loading-dot-1, .loading-dot-2, .loading-dot-3, .loading-dot-4': {
      backgroundColor: theme.palette.success.main,
    },
  },
  '&.negative': {
    '& .loading-dot-1, .loading-dot-2, .loading-dot-3, .loading-dot-4': {
      backgroundColor: theme.palette.warning.main,
    },
  },
  '& .loading-dot-1, .loading-dot-2, .loading-dot-3, .loading-dot-4': {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    animation: `${loadingAnimation} 1s infinite linear`,
    '&.loading-dot-2': {
      animationDelay: '0.2s',
    },
    '&.loading-dot-3': {
      animationDelay: '0.5s',
    },
    '&.loading-dot-4': {
      animationDelay: '0.8s',
    },
  },
}));
