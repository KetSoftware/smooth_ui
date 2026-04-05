export interface ITablePaginationFooterProps {
  /** Total number of items */
  total: number;
  /** Current page (1-based) */
  page: number;
  /** Page size */
  pageSize: number;
  /** Called with new page number (1-based) */
  onPageChange: (page: number) => void;
  /** Called when page size changes; if not provided, page size selector is hidden */
  onPageSizeChange?: (size: number) => void;
  /** Number of items on current page (for "X of Y"); derived from total/page/pageSize if omitted */
  countInThisPage?: number;
  /** Whether to show the page size dropdown (default true when onPageSizeChange is provided) */
  showPageSizeSelector?: boolean;
  /** Options for page size dropdown (default: PageSizes from shared/constants) */
  pageSizeOptions?: number[];
}
