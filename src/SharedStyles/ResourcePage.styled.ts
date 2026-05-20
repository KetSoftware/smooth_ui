import { Box, Button, FormControl, Stack, Typography, styled } from '@mui/material';

/** Section heading with optional icon – aligns with app section title patterns (Help, Settings). */
export const ResourceSectionHeading = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  '& .MuiTypography-root': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

/** Section heading with extra top spacing (e.g. for second section on page). */
export const ResourceSectionHeadingSecondary = styled(ResourceSectionHeading)(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

/** Wrapper for grid below a section heading – theme top spacing. */
export const ResourceGridSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

/** Subtitle / category label on resource pages – uses theme primary for accent. */
export const ResourceSectionSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

/** Card description text – theme secondary, no raw gray. */
export const ResourceCardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 300,
}));

/** FormControl for filter/search on resource template pages – replaces sx minWidth. */
export const ResourceFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 330,
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

/** Hero title on marketing/employer resource home – responsive typography from theme. */
export const ResourceHeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h5.fontSize,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
})) as typeof Typography;

/** Hero body text. */
export const ResourceHeroBody = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.body2.fontSize,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.body1.fontSize,
  },
}));

/** Spaced stack for CTA block – theme spacing, no inline pt/pb. */
export const ResourceCTAStack = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

/** Wrapper for resource cards – consistent height and bottom spacing (use with ShPaper inside). */
export const ResourceCardWrapper = styled(Box)(({ theme }) => ({
  height: '100%',
  marginBottom: theme.spacing(1.25),
}));

/** Stack spacing for section content below a heading. */
export const ResourceSectionStack = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

type ResourceAiToolFormGridProps = {
  /** Number of text fields before the submit button (default 3). */
  fieldColumns?: 2 | 3;
};

/** AI generator toolbar: fields grow; submit keeps natural width (no clipped labels). */
export const ResourceAiToolFormGrid = styled(Box, {
  shouldForwardProp: prop => prop !== 'fieldColumns',
})<ResourceAiToolFormGridProps>(({ theme, fieldColumns = 3 }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  alignItems: 'center',
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: `repeat(${Math.min(fieldColumns, 2)}, minmax(0, 1fr))`,
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: `repeat(${fieldColumns}, minmax(0, 1fr)) auto`,
  },
  '& > .resource-ai-tool-submit': {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      justifySelf: 'end',
    },
  },
}));

/** Hero search + primary CTA on template list pages. */
export const ResourceHeroCtaRow = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  '& > *:first-of-type': {
    flex: '1 1 200px',
    minWidth: 0,
    maxWidth: 720,
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

/** Horizontal CTAs that wrap; use with ShButton (fit-content width by default). */
export const ResourceActionRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  justifyContent: 'center',
}));

/** Full-width picker in template category grids. */
export const ResourceTemplateCardButton = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  textAlign: 'left',
  whiteSpace: 'normal',
  height: 'auto',
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  minHeight: 48,
  textTransform: 'none',
}));
