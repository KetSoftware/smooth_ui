import { Stack, useTheme } from '@mui/material';
import ShDarkModeLogo from '../assets/logos/sh_dark_mode.svg';
import ShLightModeLogo from '../assets/logos/sh_light_mode.svg';
import { Link } from 'react-router-dom';

export const ShLogo = ({ link }: { link?: string }) => {
  const mode = useTheme().palette.mode;
  const curTheme = mode === 'dark' ? 'dark' : 'light';
  return (
    <>
      {link ? (
        link.startsWith('http') ? (
          <Stack component='a' href={link}>
            <img src={curTheme === 'light' ? ShLightModeLogo : ShDarkModeLogo} alt='Logo' />
          </Stack>
        ) : (
          <Stack component={Link} to={link}>
            <img src={curTheme === 'light' ? ShLightModeLogo : ShDarkModeLogo} alt='Logo' />
          </Stack>
        )
      ) : (
        <img src={curTheme === 'light' ? ShLightModeLogo : ShDarkModeLogo} alt='Logo' width='100%' height='100%' />
      )}
    </>
  );
};
