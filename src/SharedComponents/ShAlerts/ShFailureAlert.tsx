import { Box } from '@mui/material';
import { ShAlert } from '../../shStyleExports';
import { DefaultAPIErrorMsg } from '../../constants/ui';

export const ShFailureAlert = ({ msg }: { msg: string }) => {
  return (
    <>
      <Box marginBottom={2} width='100%'>
        <ShAlert severity='error'>{msg ?? DefaultAPIErrorMsg}</ShAlert>
      </Box>
    </>
  );
};
