import React from 'react';
import { Box } from '@mui/material';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import type { SurveyScaleValue } from '../../constants/survey-scale';

interface SurveyResponseIconsProps {
  value: number;
  colored?: boolean;
  primaryColor?: boolean;
}

/** Fixed width so 1 vs 2 thumbs don't change layout between questions */
const ICON_BOX_SX = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 32 };

/**
 * Renders thumbs up/down icons for survey scale values (-3, -1, 1, 3).
 * Wrapped in a fixed-width box so layout stays consistent across questions.
 * Shared by apply-flow Survey and library PredictiveSurveyAssessmentPage.
 */
export function SurveyResponseIcons({ value, colored = true, primaryColor = false }: SurveyResponseIconsProps): React.ReactElement | null {
  const iconColor = (positive: boolean) => {
    if (primaryColor) return 'primary';
    if (colored) return positive ? 'success' : 'warning';
    return 'action';
  };
  let content: React.ReactNode = null;
  switch (value as SurveyScaleValue) {
    case -3:
      content = (
        <>
          <ThumbDownAltIcon fontSize='small' color={iconColor(false) as any} />
          <ThumbDownAltIcon fontSize='small' color={iconColor(false) as any} />
        </>
      );
      break;
    case -1:
      content = <ThumbDownAltIcon fontSize='small' color={iconColor(false) as any} />;
      break;
    case 1:
      content = <ThumbUpAltIcon fontSize='small' color={iconColor(true) as any} />;
      break;
    case 3:
      content = (
        <>
          <ThumbUpAltIcon fontSize='small' color={iconColor(true) as any} />
          <ThumbUpAltIcon fontSize='small' color={iconColor(true) as any} />
        </>
      );
      break;
    default:
      return null;
  }
  return (
    <Box component='span' sx={ICON_BOX_SX}>
      {content}
    </Box>
  );
}
