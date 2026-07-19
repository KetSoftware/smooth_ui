import type { MouseEvent } from 'react';
import { Alert, AlertProps, Backdrop, Dialog, DialogProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import TwoStepAuthImage from '../assets/Login/DeviceAuth.svg';
import { TJustifyContent } from '../layoutTypes';
import { WhiteColor } from './styleConstants';

interface IShAlert extends AlertProps {
  marginTop?: number;
  marginBottom?: number;
  stickyAlert?: boolean;
  fullWidth?: boolean;
}

export const ShAlert = styled(Alert, {
  shouldForwardProp: prop =>
    prop !== 'marginTop' && prop !== 'marginBottom' && prop !== 'stickyAlert' && prop !== 'fullWidth',
})<IShAlert>(({ theme, marginTop, marginBottom, stickyAlert, fullWidth }) => ({
  marginTop: marginTop ? theme.spacing(marginTop) : 0,
  marginBottom: marginBottom ? theme.spacing(marginBottom) : 0,
  display: 'flex',
  alignItems: 'center',
  ...(fullWidth
    ? {
        width: '100%',
        margin: 0,
        boxSizing: 'border-box',
      }
    : {}),
  ...(stickyAlert
    ? {
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 2,
      }
    : {}),
}));

export const ShBackdrop = styled(Backdrop)(({ theme }) => ({
  color: WhiteColor,
  zIndex: theme.zIndex.drawer + 1,
  '& .MuiCard-root': {
    maxWidth: '400px',
  },
  '& .MuiCircularProgress-root': {
    alignSelf: 'center',
  },
}));

interface IShDialogStyleProps {
  actionsPlacement?: TJustifyContent;
}

const StyledShDialog = styled(Dialog, {
  shouldForwardProp: prop => prop !== 'actionsPlacement',
})<IShDialogStyleProps>(({ theme, actionsPlacement = 'space-between' }) => ({
  '& .MuiDialogTitle-root': {
    position: 'relative',
    padding: theme.spacing(2),
    // Vertically center close IconButtons; keep inset from the paper edge.
    '& > .MuiIconButton-root': {
      position: 'absolute',
      right: theme.spacing(1),
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
  '& .MuiDialog-paper': {
    minHeight: '150px',

    minWidth: '600px',

    [theme.breakpoints.down('sm')]: {
      minWidth: '90vw',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100vw',
      margin: theme.spacing(1),
    },
    '& .auth-icon': {
      backgroundImage: `url(${TwoStepAuthImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      height: '21vh',
      width: '17vw',
      minHeight: '80px',
      minWidth: '60px',
    },
  },
  '& .MuiDialogActions-root': {
    justifyContent: actionsPlacement,
  },
  '&.JobDescriptionDialog': {
    '& .MuiDialogContent-root': {
      '& p, ul': {
        margin: 0,
      },
    },
  },
  '& .interview-preview': {
    '& p, ul': {
      margin: 0,
    },
  },
}));

type IShDialogProps = Omit<DialogProps, 'onClick'> & {
  actionsPlacement?: TJustifyContent;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

export const ShDialog = (props: IShDialogProps) => <StyledShDialog {...props} />;
