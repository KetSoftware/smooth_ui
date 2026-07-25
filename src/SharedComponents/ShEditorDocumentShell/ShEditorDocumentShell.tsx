import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

/**
 * Document chrome around EditorJS (Confluence/Jira-like).
 *
 * EditorJS nests `.ce-toolbar__actions` (+ / tune) inside `.ce-toolbar__content`,
 * which shares horizontal alignment with `.ce-block__content`. Pinning actions to
 * `left: 0` therefore paints handles on the text.
 *
 * Pattern:
 * 1) Inset both content + toolbar content with the same left margin (gutter).
 * 2) Hang actions at `right: 100%` into that gutter with a clear gap.
 * Do not use redactor padding-left — EditorJS positions the toolbar at the
 * redactor edge, so padding would shove handles into the outline rail.
 */
/** Left gutter for + / tune — keep compact so canvas density matches LMS (E19: 56px). */
const GUTTER = 56;
const GUTTER_GAP = 8;
const ACTIONS_WIDTH = GUTTER - GUTTER_GAP;

export const ShEditorDocumentShellRoot = styled(Box, {
  shouldForwardProp: prop => prop !== 'minHeightPx' && prop !== 'embedded',
})<{ minHeightPx?: number; embedded?: boolean }>(({ theme, minHeightPx, embedded }) => ({
  position: 'relative',
  minHeight: minHeightPx || theme.spacing(36),
  backgroundColor: theme.palette.background.paper,
  border: embedded ? 'none' : `1px solid ${theme.palette.divider}`,
  borderRadius: embedded ? 0 : Number(theme.shape.borderRadius) || 4,
  padding: embedded ? theme.spacing(0.5, 0, 2, 0) : theme.spacing(1.5, 1.5, 2.5, 0.5),
  boxShadow: 'none',
  overflow: 'visible',

  '& .codex-editor': {
    position: 'relative',
  },

  '& .codex-editor__redactor': {
    paddingBottom: `${theme.spacing(6)} !important`,
    paddingLeft: '0 !important',
  },

  /* Wide document — kill default 650px centered column; reserve left gutter. */
  '& .ce-block__content, & .ce-toolbar__content': {
    maxWidth: 'none !important',
    width: `calc(100% - ${GUTTER}px) !important`,
    marginLeft: `${GUTTER}px !important`,
    marginRight: '0 !important',
  },

  '& .ce-toolbar': {
    zIndex: 4,
  },

  /*
   * Actions are children of `.ce-toolbar__content` (aligned with block text).
   * Hang them into the left margin gutter — never over `.ce-block__content`.
   */
  '& .ce-toolbar__actions': {
    position: 'absolute',
    left: 'auto !important',
    right: '100% !important',
    width: `${ACTIONS_WIDTH}px`,
    marginRight: `${GUTTER_GAP}px !important`,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    paddingLeft: 0,
    paddingRight: 0,
  },

  /* Ghost + / drag — no side borders (Notion/Confluence gutter). */
  '& .ce-toolbar__plus, & .ce-toolbar__settings-btn': {
    color: theme.palette.grey[600],
    background: 'transparent !important',
    border: 'none !important',
    borderRadius: Number(theme.shape.borderRadius) || 4,
    width: 24,
    height: 24,
    boxShadow: 'none !important',
    flexShrink: 0,
  },

  '& .ce-toolbar__plus svg, & .ce-toolbar__settings-btn svg': {
    fill: 'none',
    stroke: theme.palette.grey[600],
    color: theme.palette.grey[600],
  },

  '& .ce-toolbar__plus:hover, & .ce-toolbar__settings-btn:hover': {
    background: theme.palette.action.hover + ' !important',
    border: 'none !important',
  },

  '& .ce-popover, & .ce-conversion-toolbar, & .ce-inline-toolbar, & .ce-toolbox': {
    zIndex: 30,
  },

  '& .ce-popover': {
    left: '0 !important',
    marginLeft: 0,
  },

  '& .ce-toolbar__plus-shortcut, & .ce-toolbox': {
    left: '0 !important',
  },

  '& .ce-popover-item__icon, & .ce-toolbox__button, & .ce-inline-toolbar__dropdown, & .ce-inline-tool': {
    color: theme.palette.grey[600],
    background: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: Number(theme.shape.borderRadius) || 4,
    boxShadow: 'none',
  },

  '& .ce-popover-item__icon svg, & .ce-toolbox__button svg, & .ce-inline-tool svg': {
    fill: 'none',
    stroke: theme.palette.grey[600],
    color: theme.palette.grey[600],
  },

  '& .ce-popover-item:hover .ce-popover-item__icon, & .ce-toolbox__button:hover': {
    background: theme.palette.action.hover,
  },

  '& .ce-paragraph[data-placeholder]:empty::before': {
    color: theme.palette.text.disabled,
  },

  /* Dense, readable prose — match Smooth typography scale (not oversized editor defaults). */
  '& .ce-block': {
    marginTop: theme.spacing(0.25),
    marginBottom: theme.spacing(0.25),
  },

  '& .cdx-block, & .ce-paragraph': {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: 1.55,
    color: theme.palette.text.primary,
    letterSpacing: theme.typography.body1.letterSpacing,
  },

  '& .ce-header': {
    fontWeight: 700,
    letterSpacing: '-0.01em',
    padding: `${theme.spacing(0.5)} 0 ${theme.spacing(0.25)}`,
    lineHeight: 1.35,
  },

  '& .lms-upload-pick': {
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(1, 1.5),
    borderRadius: Number(theme.shape.borderRadius) || 4,
    border: `1px dashed ${theme.palette.divider}`,
    background: theme.palette.common.white,
    cursor: 'pointer',
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
  },

  '& .lms-upload-block': {
    padding: theme.spacing(1),
  },

  '& .lms-link-block': {
    margin: theme.spacing(0.5, 0),
  },
}));

export type ShEditorDocumentShellProps = Omit<BoxProps, 'minHeight'> & {
  children?: ReactNode;
  minHeightPx?: number;
  embedded?: boolean;
};

export function ShEditorDocumentShell({
  children,
  minHeightPx,
  embedded,
  ...rest
}: ShEditorDocumentShellProps) {
  return (
    <ShEditorDocumentShellRoot minHeightPx={minHeightPx} embedded={embedded} {...rest}>
      {children}
    </ShEditorDocumentShellRoot>
  );
}
