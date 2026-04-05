/**
 * Shared constants and types for the predictive/personality survey scale
 * (Strongly disagree … Strongly agree). Used by both apply-flow Survey and
 * library PredictiveSurveyAssessmentPage.
 */

export type SurveyScaleValue = -3 | -1 | 1 | 3;

export interface SurveyScaleOption {
  id: SurveyScaleValue;
  name: string;
}

export const SURVEY_SCALE_OPTIONS: SurveyScaleOption[] = [
  { id: -3, name: 'Strongly disagree' },
  { id: -1, name: 'Disagree' },
  { id: 1, name: 'Agree' },
  { id: 3, name: 'Strongly agree' },
];

export function isValidSurveyScaleValue(value: unknown): value is SurveyScaleValue {
  return value === -3 || value === -1 || value === 1 || value === 3;
}
