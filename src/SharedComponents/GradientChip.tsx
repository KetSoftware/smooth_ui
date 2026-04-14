import type { ReactNode } from 'react';
import { Box, BoxProps, styled, keyframes } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

interface GradientBorderProps extends BoxProps {
  gradient?: string;
  animated?: boolean;
  borderWidth?: number;
  borderRadius?: number;
  hoverable?: boolean;
  animationDurationMs?: number;
  borderOpacity?: number;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

const GradientBorderBox = styled(Box)<GradientBorderProps>(({ theme, gradient, animated, borderWidth = 2, borderRadius = 15, hoverable = true, animationDurationMs = 3000, borderOpacity = 1 }) => ({
  position: 'relative',
  padding: borderWidth,
  borderRadius: borderRadius,
  textTransform: 'none',
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
  transition: 'transform 180ms ease, filter 180ms ease, box-shadow 180ms ease',
  cursor: hoverable ? 'pointer' : 'default',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    padding: borderWidth,
    borderRadius: borderRadius,
    background: gradient || 'linear-gradient(90deg, #74C05A, #007BFF)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    opacity: borderOpacity,
    transition: 'opacity 400ms ease',
    willChange: 'background-position, opacity',
    ...(animated && {
      backgroundSize: '300% 300%',
      animation: `${gradientAnimation} ${animationDurationMs}ms linear infinite`,
    }),
  },
  '&:hover': hoverable
    ? {
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows[2],
        filter: 'saturate(1.05)',
      }
    : {},
  '&:hover::before':
    hoverable && animated
      ? {
          animation: `${gradientAnimation} 1.4s ease infinite`,
        }
      : {},
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

export const GradientBorder = ({ gradient = 'linear-gradient(90deg, #74C05A, #007BFF)', animated = false, borderWidth = 2, borderRadius = 20, children, ...props }: GradientBorderProps) => {
  return (
    <GradientBorderBox gradient={gradient} animated={animated} borderWidth={borderWidth} borderRadius={borderRadius} {...props}>
      {children}
    </GradientBorderBox>
  );
};
