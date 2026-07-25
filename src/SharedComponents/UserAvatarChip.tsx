import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { ShAvatar } from '../shStyleExports';
import { getInitialsFromName, stringToColor } from '../utils/avatarText';

export interface UserAvatarChipProps {
  fullName: string;
  avatarSrc?: string;
  email?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'filled';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  showEmail?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
  initialsLength?: 1 | 2;
  avatarWidth?: number;
  avatarHeight?: number;
}

const chipSx = {
  boxShadow: 'none',
  filter: 'none',
  backgroundColor: 'background.paper',
  borderColor: 'divider',
  '&:hover, &:focus, &:active, &.Mui-focusVisible': {
    boxShadow: 'none',
    filter: 'none',
  },
} as const;

const UserAvatarChip: React.FC<UserAvatarChipProps> = ({
  fullName,
  avatarSrc,
  email,
  size = 'medium',
  variant = 'default',
  showEmail = false,
  onClick,
  onDelete,
  className,
  initialsLength = 2,
  avatarWidth,
  avatarHeight,
}) => {
  let initials: string;
  if (initialsLength === 1) {
    const nameParts = fullName.trim().split(' ');
    initials = nameParts[0]?.charAt(0)?.toUpperCase() || '?';
  } else {
    initials = getInitialsFromName(fullName, true, true);
  }

  const avatarBackgroundColor = stringToColor(initials);
  const computedSize = size === 'small' ? 20 : size === 'large' ? 32 : 25;
  const width = avatarWidth ?? computedSize;
  const height = avatarHeight ?? computedSize;
  /** default + outlined → outlined (no grey fill / elevation). filled kept for explicit call sites. */
  const chipVariant = variant === 'filled' ? 'filled' : 'outlined';

  return (
    <Chip
      avatar={
        <ShAvatar width={width} height={height} backgroundColor={avatarBackgroundColor} src={avatarSrc}>
          <Typography variant='caption' color='white'>
            {initials}
          </Typography>
        </ShAvatar>
      }
      label={
        <Box>
          <Typography variant='caption'>{fullName}</Typography>
          {showEmail && email && (
            <Typography variant='caption' sx={{ fontSize: '0.7rem', lineHeight: 1, opacity: 0.7 }}>
              {email}
            </Typography>
          )}
        </Box>
      }
      variant={chipVariant}
      size={size === 'small' ? 'small' : 'medium'}
      onClick={onClick}
      onDelete={onDelete}
      clickable={!!onClick}
      className={className}
      sx={
        chipVariant === 'outlined'
          ? chipSx
          : {
              boxShadow: 'none',
              filter: 'none',
              '&:hover, &:focus, &:active, &.Mui-focusVisible': {
                boxShadow: 'none',
                filter: 'none',
              },
            }
      }
    />
  );
};

export default UserAvatarChip;
