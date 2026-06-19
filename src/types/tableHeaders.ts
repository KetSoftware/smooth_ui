import type { ReactNode } from 'react';

export interface ITableHeadersBase<C, CID = string> {
  columnName: C;
  columnNameInDb?: CID;
  label: string;
  minWidth?: number | string;
  render?: (row: unknown) => ReactNode;
}
