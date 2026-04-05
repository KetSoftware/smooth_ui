import { Box, Stack, Tooltip, TooltipProps, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ShButton } from '../shStyleExports';

export interface ShPaperTooltipProps {
  title: ReactNode;
  children: ReactNode;
  placement?: TooltipProps['placement'];
  maxWidth?: number;
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  arrow?: boolean;
  showArrowIcon?: boolean;
  arrowLink?: string;
}

export const ShPaperTooltip = ({ title, children, placement = 'top', maxWidth = 320, open, onClose, onOpen, onClick, arrow = true, showArrowIcon, arrowLink }: ShPaperTooltipProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const tooltipBg = theme.palette.background.paper;
  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
  const shadow = isDark
    ? '0 4px 20px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.08)'
    : '0 4px 14px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.06)';

  let content =
    typeof title === 'string' ? (
      <Typography variant='body2' color='text.primary' sx={{ lineHeight: 1.55, letterSpacing: '0.01em' }}>
        {title}
      </Typography>
    ) : (
      <Box color='text.primary'>{title}</Box>
    );
  if (showArrowIcon && arrowLink) {
    content = (
      <Stack rowGap={1.25}>
        {content}
        <ShButton endIcon={<ArrowForwardIosIcon fontSize='small' />} component={RouterLink} to={arrowLink} variant='outlined' color='inherit' size='small'>
          Read more
        </ShButton>
      </Stack>
    );
  }

  return (
    <Tooltip
      placement={placement}
      arrow={arrow}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      slotProps={{
        tooltip: {
          sx: {
            maxWidth,
            padding: 0,
            backgroundColor: 'transparent',
          },
        },
        popper: {
          sx: {
            '& .MuiTooltip-arrow': {
              color: tooltipBg,
              '&::before': {
                border: '1px solid',
                borderColor,
              },
            },
          },
        },
      }}
      title={
        <Box
          sx={{
            px: 1.75,
            py: 1.5,
            borderRadius: 2,
            border: '1px solid',
            borderColor,
            backgroundColor: tooltipBg,
            boxShadow: shadow,
            backdropFilter: isDark ? 'blur(12px)' : undefined,
          }}
        >
          {content}
        </Box>
      }
    >
      <Box component='span' sx={{ display: 'inline-block' }} onClick={onClick}>
        {children}
      </Box>
    </Tooltip>
  );
};
