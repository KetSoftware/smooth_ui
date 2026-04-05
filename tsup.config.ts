import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  loader: {
    '.svg': 'dataurl',
  },
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react-router-dom',
    'react-quill',
    'date-fns',
    '@emotion/react',
    '@emotion/styled',
    '@mui/material',
    '@mui/material/*',
    '@mui/icons-material',
    '@mui/icons-material/*',
    '@mui/x-data-grid',
    '@mui/x-date-pickers',
    '@mui/x-date-pickers/*',
  ],
});
