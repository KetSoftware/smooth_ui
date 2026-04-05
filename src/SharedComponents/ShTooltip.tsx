import { ClickAwayListener, Stack, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import { useIsSmScreen } from '../hooks/useIsSmScreen';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Example icon
import { ShButton } from '../shStyleExports';
import { Link as RouterLink } from 'react-router-dom';

interface IShTooltip {
  title: string | JSX.Element;
  children: JSX.Element;
  placement?: 'bottom' | 'left' | 'right' | 'top' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'top-end' | 'top-start' | undefined;
  showArrowIcon?: boolean;
  arrowLink?: string | JSX.Element;
}

// To set tooltip Width.
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 290,
    display: 'flex',
    alignItems: 'center',
  },
});

export const ShTooltip = ({ title, children, placement, showArrowIcon = false, arrowLink }: IShTooltip) => {
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  const isSmScreen = useIsSmScreen();

  const enhancedTitle = showArrowIcon ? (
    <Stack rowGap={1}>
      {title}
      {arrowLink ? (
        typeof arrowLink === 'string' ? (
          <ShButton endIcon={<ArrowForwardIosIcon fontSize='small' />} component={RouterLink} to={arrowLink} variant='outlined' color='inherit' size='small'>
            Read more
          </ShButton>
        ) : (
          arrowLink
        )
      ) : (
        <ArrowForwardIosIcon fontSize='small' />
      )}
    </Stack>
  ) : (
    title
  );

  return (
    <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
      <div>
        <CustomWidthTooltip title={enhancedTitle} open={openTooltip} onClose={() => setOpenTooltip(false)} disableFocusListener disableHoverListener disableTouchListener placement={placement ?? 'bottom'} arrow>
          <span onMouseEnter={() => !isSmScreen && setOpenTooltip(true)} onMouseLeave={() => !isSmScreen && setOpenTooltip(false)} onClick={() => setOpenTooltip(!openTooltip)}>
            {children}
          </span>
        </CustomWidthTooltip>
      </div>
    </ClickAwayListener>
  );
};
