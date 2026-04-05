import { Box, FormControl, Stack, Typography, styled } from '@mui/material';

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
