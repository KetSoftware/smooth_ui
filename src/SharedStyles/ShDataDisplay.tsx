import type { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, AvatarProps, Chip, ChipProps, Divider, ListItemButton, Stack, Table, TableCell, TableContainer, TableProps, TableRow, TableRowProps, Typography, TableHead, TableBody, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ResourceTypography } from './ResourceTypography';
import { BorderColorDark, BorderColorLight, DarkModeBackground, MUIGrey, PaperBorderRadius, PrimaryThemeColorLight, WhiteColor } from './styleConstants';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

type ColorType = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'transparent';

interface IShAvatarProps extends AvatarProps {
  color?: ColorType;
  height?: number | string;
  width?: number | string;
  minWidth?: number | string;
  backgroundColor?: string;
  svgSize?: string;
}

export const ShAvatar = styled((props: IShAvatarProps) => <Avatar {...props} />, {
  shouldForwardProp: prop => prop !== 'backgroundColor' && prop !== 'minWidth' && prop !== 'svgSize',
})(({ theme, color, width = 'unset', height = 'unset', backgroundColor, minWidth = 'unset', svgSize = '24px' }) => ({
  [theme.breakpoints.up('xs')]: {
    '&.dashboard-user-avatar': {
      height: '45px',
      width: '45px',
    },
  },
  [theme.breakpoints.up('sm')]: {
    '&.dashboard-user-avatar': {
      height: '50px',
      width: '50px',
    },
  },
  [theme.breakpoints.up('md')]: {
    '&.dashboard-user-avatar': {
      height: '55px',
      width: '55px',
    },
  },
  [theme.breakpoints.up('lg')]: {
    '&.dashboard-user-avatar': {
      height: '55px',
      width: '55px',
    },
  },
  backgroundColor: backgroundColor ? backgroundColor : color === 'primary' ? theme.palette.primary.main : color === 'secondary' ? theme.palette.secondary.main : color === 'success' ? theme.palette.success.main : color === 'warning' ? theme.palette.warning.main : color === 'transparent' ? 'transparent' : theme.palette.error.main,

  height: height,
  width: width,
  minWidth: minWidth,
  '& svg': {
    fontSize: svgSize,
  },
}));

export const ThemeColorDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark,
}));

interface IShTable extends TableProps {
  columnBorders?: boolean;
}

// Table view styles
export const ShTableContainer = styled(TableContainer)(({ theme }) => ({
  overflow: 'auto',
  flex: 1,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark}`,
  borderRadius: PaperBorderRadius,
  minWidth: 300,
}));

export const Sh = {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
};

export const ShTable = styled((props: IShTable) => <Table {...props} />, {
  shouldForwardProp: prop => prop !== 'columnBorders',
})(({ theme, columnBorders = false }) => ({
  borderCollapse: 'separate',
  [theme.breakpoints.up('xs')]: {
    [`& td,th`]: {
      padding: '8px 8px',
      '&:first-of-type': {
        paddingLeft: '10px',
        borderLeft: '4px solid transparent',
        transition: 'border-left-color 0.2s ease',
      },
    },
  },
  [theme.breakpoints.up('sm')]: {
    [`& td,th`]: {
      padding: '8px 8px',
      '&:first-of-type': {
        paddingLeft: '10px',
        borderLeft: '4px solid transparent',
        transition: 'border-left-color 0.2s ease',
      },
    },
  },
  [theme.breakpoints.up('md')]: {
    [`& td,th`]: {
      padding: '8px 8px',
      '&:first-of-type': {
        paddingLeft: '10px',
        borderLeft: '4px solid transparent',
        transition: 'border-left-color 0.2s ease',
      },
    },
  },
  [theme.breakpoints.up('lg')]: {
    [`& td,th`]: {
      padding: '8px 8px',
      '&:first-of-type': {
        paddingLeft: '10px',
        borderLeft: '4px solid transparent',
        transition: 'border-left-color 0.2s ease',
      },
    },
  },
  [theme.breakpoints.up('xl')]: {
    [`& td,th`]: {
      padding: '8px 8px',
      '&:first-of-type': {
        paddingLeft: '10px',
        borderLeft: '4px solid transparent',
        transition: 'border-left-color 0.2s ease',
      },
    },
  },
  '& tr': {
    '& td,th': {
      borderBottom: `1px solid ${theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark}`,
    },
    '& td:not(:last-of-type), & th:not(:last-of-type)': {
      borderRight: columnBorders ? `1px solid ${theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark}` : 'none',
    },
  },
}));

interface IShTableRow extends TableRowProps {
  cursor: 'pointer' | 'default';
  hoverGrey?: boolean;
}

export const ShTableRow = styled((props: IShTableRow) => <TableRow {...props} />, {
  shouldForwardProp: prop => prop !== 'cursor' && prop !== 'hoverGrey',
})(({ theme, cursor, hoverGrey = false }) => ({
  cursor: cursor,
  backgroundColor: theme.palette.mode === 'light' ? WhiteColor : DarkModeBackground,
  '& th': {
    fontWeight: 500,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : DarkModeBackground,
    color: theme.palette.text.secondary,
    '&.select-header': {
      left: 0,
      zIndex: 3,
    },
  },
  '& .more-btn': {
    opacity: 0,
  },
  '&:hover': {
    ...(hoverGrey
      ? {
          backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : DarkModeBackground,
        }
      : {}),
    '& .on-hover': {
      visibility: 'visible',
    },
    '& .more-btn': {
      opacity: 1,
    },
  },
  '& .on-hover': {
    visibility: 'hidden',
  },
  '&.is-actions-open': {
    backgroundColor: PrimaryThemeColorLight,
  },
  '&:focus': {
    backgroundColor: '#ebebeb',
  },
  '& .MuiTableCell-paddingNone': {
    padding: 0,
  },
}));

export const RowSelectCell = styled(TableCell)(({ theme }) => ({
  width: '2%',
  paddingRight: '0px',
  textAlign: 'center',
  position: 'sticky',
  left: 0,
  zIndex: 1,
  backgroundColor: 'inherit',
}));

export const CollapsibleTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? WhiteColor : DarkModeBackground,
  justifyItems: 'right',
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'table-row',
  },
  [theme.breakpoints.up('md')]: {
    display: 'table-row',
  },
  '& .MuiTableCell-root': {
    padding: 0,
    border: 'none',
  },
}));

interface IUnderlinedText extends TypographyProps {
  underlineType?: 'default' | 'border';
  borderBottomWidth?: number;
  borderType?: 'dotted' | 'double' | 'solid';
  borderColor?: string;
}

export const UnderlinedText = styled((props: IUnderlinedText) => <Typography {...props} />, {
  shouldForwardProp: prop => prop !== 'underlineType' && prop !== 'borderBottomWidth',
})(({ theme, underlineType = 'default', borderBottomWidth = 1, borderType = 'solid', borderColor = theme.palette.text.primary }) => ({
  textDecoration: underlineType === 'default' ? 'underline' : 'none',
  borderBottom: underlineType === 'border' ? `${borderBottomWidth}px ${borderType} ${borderColor}` : 'none',
}));

export const GutterText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const LabelWithBadge = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .MuiTypography-caption': {
    color: theme.palette.primary.main,
    padding: theme.spacing(0.5),
    height: '20px',
    minWidth: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
  },
}));

export const ShBullets = styled('ul')(() => ({
  paddingInlineStart: '20px',
  color: MUIGrey,
  margin: 'unset',
}));

interface ShCheckmarkProps {
  items: string[];
}

export const ShCheckmark: FC<ShCheckmarkProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        const trimmedItem = item.trim();
        const isNegative = trimmedItem.startsWith('~');
        const displayText = trimmedItem.replace(/^[-~]/, '').trim(); // Removin leading - or ~

        return (
          displayText && (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Stack direction='row' spacing={1}>
                {isNegative ? (
                  <CloseIcon color='error' fontSize='small' /> // Red X for items starting with ~
                ) : (
                  <CheckIcon color='success' fontSize='small' /> // Green check for items starting with -
                )}
                <ResourceTypography variant='caption' gutterBottom>
                  {displayText}
                </ResourceTypography>
              </Stack>
            </li>
          )
        );
      })}
    </>
  );
};

// export const ShChip = styled((props: ISquareChipProps) => <Chip {...props} />, {
//     shouldForwardProp: (prop) => prop !== "bgColor" && prop !== "textColor" && prop !== "borderRadius"
// })(
//     ({ theme, bgColor, textColor, borderRadius }) => (
//         {
//             backgroundColor: bgColor,
//             color: textColor,
//             borderRadius: borderRadius || 4,
//         }
//     ));

interface ISquareChipProps extends ChipProps {
  bgColor?: string;
  textColor?: string;
  borderRadius?: string;
  customSize?: 'xsmall' | 'xs' | 'small' | 'medium' | 'large';
  maxWidth?: string;
  borderColor?: string;
  hideBoxShadow?: boolean;
  gradient?: string;
}

export const ShChip = styled(
  (props: ISquareChipProps) => {
    const { customSize, ...restProps } = props;
    return <Chip {...restProps} />;
  },
  {
    shouldForwardProp: prop => prop !== 'bgColor' && prop !== 'textColor' && prop !== 'borderRadius' && prop !== 'customSize' && prop !== 'maxWidth' && prop !== 'borderColor' && prop !== 'hideBoxShadow' && prop !== 'gradient',
  }
)(({ theme, bgColor, textColor, borderRadius, customSize, maxWidth, borderColor, hideBoxShadow, gradient }) => {
  let padding, fontSize;

  switch (customSize) {
    case 'xsmall':
      padding = '0.5px 2px';
      fontSize = theme.typography.caption.fontSize;
      break;
    case 'xs':
      padding = '0.5px 0.5px';
      fontSize = theme.typography.caption.fontSize;
      break;
    case 'small':
      padding = '2px 6px';
      fontSize = theme.typography.body2.fontSize;
      break;
    case 'medium':
      padding = '6px 12px';
      fontSize = theme.typography.body1.fontSize;
      break;
    case 'large':
      padding = '8px 16px';
      fontSize = theme.typography.button.fontSize;
      break;
    default:
      padding = '6px 12px';
      fontSize = theme.typography.body1.fontSize;
  }

  return {
    boxShadow: hideBoxShadow ? '' : '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: gradient ? 'transparent' : bgColor,
    background: gradient || bgColor,
    color: textColor,
    borderRadius: borderRadius || '4px',
    padding: padding,
    fontSize: fontSize,
    maxWidth: maxWidth || 'none',
    border: borderColor ? `1px solid ${borderColor}` : '',
  };
});

export const ShListItemButton = styled(ListItemButton)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      height: 'fit-content',
    },
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      height: 'fit-content',
    },
  },
  [theme.breakpoints.up('md')]: {
    '& .MuiListItemIcon-root': {
      minWidth: '24px',
      height: 'fit-content',
    },
  },
  paddingRight: theme.spacing(1),
}));

export const ShDataGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader': {
    padding: theme.spacing(1),
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));
