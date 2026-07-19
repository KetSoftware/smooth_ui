import { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from '@mui/material';
import { IConfirmationDialog } from './ConfirmationDialogModel';
import { ShDialog } from '../../shStyleExports';
import { StyledActionButton } from '../StyledActionButton';

export const ConfirmationDialog = ({
  onCancel,
  onConfirm,
  contentText,
  title,
  isDialogOpen,
  cancelButtonLabel,
  actionsPlacement,
  onDialogClose,
  confirmButtonLabel,
  confirmButtonColor = 'success',
  isCancelDisabled = false,
  isConfirmDisabled = false,
  disableBackdropClose = false,
  isShowCloseIcon,
  isOnlyOk,
  showExtraButton,
  onExtraButtonClick,
}: IConfirmationDialog) => {
  const handleClose = useCallback(() => {
    if (isCancelDisabled || isConfirmDisabled) return;
    onDialogClose ? onDialogClose() : (onCancel as () => void)?.();
  }, [onDialogClose, onCancel, isCancelDisabled, isConfirmDisabled]);

  return (
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
      <DialogTitle id='title' sx={{ pr: isShowCloseIcon ? 6 : undefined }}>
        <Stack direction='row' alignItems='center' justifyContent='center' minHeight={40}>
          {title ?? 'Confirm'}
        </Stack>
        {isShowCloseIcon && (
          <IconButton
            onClick={handleClose}
            aria-label='Close dialog'
            disabled={isCancelDisabled || isConfirmDisabled}
            size='small'
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id='sub_title' whiteSpace='break-spaces'>
          {contentText ?? 'Are you sure!'}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 1.5, gap: 1, justifyContent: isOnlyOk ? 'center' : 'flex-end' }}>
        <Stack direction='row' spacing={1} justifyContent={isOnlyOk ? 'center' : 'flex-end'} width='100%'>
          {!isOnlyOk && (
            <StyledActionButton variant='outlined' cancel onClick={onCancel} disabled={isCancelDisabled}>
              {cancelButtonLabel ?? 'Cancel'}
            </StyledActionButton>
          )}
          {showExtraButton && (
            <StyledActionButton variant='outlined' onClick={onExtraButtonClick}>
              Start Onboarding
            </StyledActionButton>
          )}
          <StyledActionButton
            variant='contained'
            color={confirmButtonColor}
            confirm={confirmButtonColor !== 'error'}
            delete={confirmButtonColor === 'error'}
            disableElevation
            onClick={onConfirm}
            disabled={isConfirmDisabled}
          >
            {confirmButtonLabel ?? 'Confirm'}
          </StyledActionButton>
        </Stack>
      </DialogActions>
    </ShDialog>
  );
};
