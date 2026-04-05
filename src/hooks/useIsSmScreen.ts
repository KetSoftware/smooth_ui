import { useMediaQuery, useTheme } from '@mui/material';

export const useIsSmScreen = () => useMediaQuery(useTheme().breakpoints.down('md'));
