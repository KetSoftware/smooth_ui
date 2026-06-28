import { GlobalStyles } from '@mui/material';

const rechartsFocusReset = {
  '&:focus': { outline: 'none' },
  '& *:focus': { outline: 'none' },
};

/** Global CSS resets shared across Smooth employer apps. */
export const SmoothGlobalStyles = () => (
  <GlobalStyles
    styles={{
      '*': {
        fontSynthesis: 'none',
      },
      'strong, b': {
        fontWeight: 0,
      },
      '.recharts-wrapper': rechartsFocusReset,
      '.recharts-surface': rechartsFocusReset,
      '.recharts-legend-wrapper': rechartsFocusReset,
      '.recharts-tooltip-wrapper': rechartsFocusReset,
      '.recharts-default-tooltip': rechartsFocusReset,
      '.recharts-cartesian-grid': rechartsFocusReset,
      '.recharts-cartesian-axis': rechartsFocusReset,
      '.recharts-area': rechartsFocusReset,
      '.recharts-line': rechartsFocusReset,
      '.recharts-bar': rechartsFocusReset,
      '.recharts-radar': rechartsFocusReset,
      '.recharts-polar-grid': rechartsFocusReset,
      '.recharts-polar-angle-axis': rechartsFocusReset,
      '.recharts-polar-radius-axis': rechartsFocusReset,
    }}
  />
);
