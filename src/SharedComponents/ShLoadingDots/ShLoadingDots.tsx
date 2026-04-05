import { Box } from '@mui/material';
import { ShLoadingDotsBox } from './ShLoadingDots.styled';

export const ShLoadingDots = ({ variant = 'positive' }: { variant?: 'positive' | 'negative' }) => {
  return (
    <>
      <ShLoadingDotsBox component='span' className={`loading-dots ${variant}`}>
        <Box component='span' className='loading-dot-1'></Box>
        <Box component='span' className='loading-dot-2'></Box>
        <Box component='span' className='loading-dot-3'></Box>
        <Box component='span' className='loading-dot-4'></Box>
      </ShLoadingDotsBox>
    </>
  );
};
