import { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from '@mui/material';
import { IConfirmationDialog } from './ConfirmationDialogModel';
import { ShButton, ShDialog } from '../../shStyleExports';

export const ConfirmationDialog = ({ onCancel, onConfirm, contentText, title, isDialogOpen, cancelButtonLabel, actionsPlacement, onDialogClose, confirmButtonLabel, isCancelDisabled = false, isConfirmDisabled = false, disableBackdropClose = false, isShowCloseIcon, isOnlyOk, showExtraButton, onExtraButtonClick }: IConfirmationDialog) => {
  const handleClose = useCallback(() => {
    onDialogClose ? onDialogClose() : (onCancel as () => void)?.();
  }, [onDialogClose, onCancel]);
  return (
    <>
      <ShDialog
        open={isDialogOpen}
        onClose={(_, reason) => {
          if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') return;
          if (disableBackdropClose) return;
          handleClose();
        }}
        actionsPlacement={actionsPlacement}
        onClick={e => e.stopPropagation()}
        aria-labelledby='title'
        aria-describedby='sub_title'
      >
        <DialogTitle id='title' textAlign='center'>
          <Box alignSelf='right'>
            {title ?? 'Confirm'}
            {isShowCloseIcon && (
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id='sub_title' whiteSpace='break-spaces'>
            {contentText ?? 'Are you sure!'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction='row' justifyContent={isOnlyOk ? 'center' : 'space-between'} width='100%'>
            {!isOnlyOk && (
              <ShButton size='small' onClick={onCancel} disabled={isCancelDisabled}>
                {cancelButtonLabel ?? 'Cancel'}
              </ShButton>
            )}
            {showExtraButton && (
              <ShButton size='small' variant='outlined' onClick={onExtraButtonClick}>
                Start Onboarding
              </ShButton>
            )}
            <ShButton variant='contained' color='success' size='small' onClick={onConfirm} disabled={isConfirmDisabled}>
              {confirmButtonLabel ?? 'Confirm'}
            </ShButton>
          </Stack>
        </DialogActions>
      </ShDialog>
    </>
  );
};
