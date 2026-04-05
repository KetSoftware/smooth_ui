import { CircularProgress, Stack } from '@mui/material';

interface ShLoaderProps {
  size?: number;
  thickness?: number;
}

export const ShLoader = ({ size = 20, thickness = 4 }: ShLoaderProps) => {
  return (
    <Stack alignItems='center'>
      <CircularProgress size={size} thickness={thickness} />
    </Stack>
  );
};
