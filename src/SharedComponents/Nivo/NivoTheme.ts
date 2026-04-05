export const getNivoTheme = (theme: any) => ({
  text: {
    fill: theme.palette.text.secondary,
    fontSize: 11,
    fontFamily: theme.typography.fontFamily,
  },
  axis: {
    ticks: {
      text: {
        fill: theme.palette.text.secondary,
        fontSize: 11,
      },
      line: {
        stroke: theme.palette.divider,
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fill: theme.palette.text.secondary,
        fontSize: 11,
      },
    },
  },
  grid: {
    line: {
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      fill: theme.palette.text.secondary,
      fontSize: 11,
    },
  },
  tooltip: {
    container: {
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[3],
      borderRadius: 8,
      padding: '8px 10px',
    },
  },
});

export const getNivoColors = (theme: any) => [theme.palette.primary.main, theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main, theme.palette.secondary.main, theme.palette.text.secondary];
