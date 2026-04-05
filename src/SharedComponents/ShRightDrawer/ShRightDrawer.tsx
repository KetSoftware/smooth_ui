import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, Typography } from '@mui/material';
import { IShRightDrawer } from './ShRightDrawerModel';
import { ShDrawer } from '../../shStyleExports';

const ShRightDrawer = ({ isOpen, onClose, title, children }: IShRightDrawer) => {
  return (
    <ShDrawer anchor='right' open={isOpen} onClose={onClose}>
      <Stack direction='column'>
        <Stack direction='row' justifyContent='space-between' alignItems='center' p={1}>
          <Typography>{title}</Typography>
          <IconButton aria-label='close' size='small' onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </Stack>
    </ShDrawer>
  );
};

export default ShRightDrawer;
