import type { ITableHeadersBase } from '../../types/tableHeaders';
export interface ISHTableSearchBar {
  searchKey: string;
  setSearchKey: (searchText: string) => void;
  onSearch: (searchText: string) => void;
  placeholder: string;
  inputAriaLabel: string;
  clearButtonAriaLabel: string;
  searchButtonAriaLabel: string;
  inputId?: string;
  clearTooltipTitle?: string;
  searchTooltipTitle?: string;
}
// "rows" is expecting an array, and each element is generic type of T
export interface ISHTable<T> {
  title: string;
  headers: ITableHeadersBase<string>[];
  rows: Array<T>;
  cellOrder: Array<string>;
  redirectionUrlsJobId: Array<string>;
  redirectionUrlsEmployerId: Array<string>;
  generateUrlJobId?: (value: string) => string;
  generateUrlEmployerId?: (value: string) => string;
  generateUrlById?: boolean;
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}
