import { MouseEvent } from 'react';
import type { TJustifyContent } from '../../layoutTypes';

// More types can be added based on use cases.
export type ConfirmationDialogFor = 'deleteJob' | 'stopHiring' | 'editJob' | 'repostJob' | undefined;

export interface IConfirmationDialogLabels {
  title?: string | JSX.Element;
  contentText?: string | JSX.Element | void;
  cancelButtonLabel?: string | JSX.Element;
  confirmButtonLabel?: string | JSX.Element;
}

export interface IConfirmationDialog extends IConfirmationDialogLabels {
  isDialogOpen: boolean;
  onDialogClose?: () => void;
  onCancel?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  onConfirm: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  isCancelDisabled?: boolean;
  isConfirmDisabled?: boolean;
  disableBackdropClose?: boolean;
  actionsPlacement?: TJustifyContent;
  isShowCloseIcon?: boolean;
  isOnlyOk?: boolean;
  showExtraButton?: boolean;
  onExtraButtonClick?: () => void;
}
