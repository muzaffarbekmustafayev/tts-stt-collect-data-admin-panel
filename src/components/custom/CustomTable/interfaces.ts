// Base interfaces for table components
export interface ColumnsProps {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: unknown, row: unknown) => React.ReactNode;
}

export interface DataProps {
  id: string | number;
  [key: string]: unknown;
}

// Generic table props interface
export interface GenericTableProps<T extends DataProps> {
  columns: ColumnsProps[];
  data: T[];
  setEditingItem?: (item: T) => void;
  onDelete?: (id: string | number) => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  showActions?: boolean;
  actions?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
  };
  canNotAdd?: boolean;
  canNotEdit?: boolean;
  canNotDelete?: boolean;
}

// Table header props
export interface TableHeaderProps {
  columns: ColumnsProps[];
  onSort?: (key: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  showActions?: boolean;
  canNotEdit?: boolean;
  canNotDelete?: boolean;
}

// Table body props
export interface TableBodyProps<T extends DataProps> {
  columns: ColumnsProps[];
  data: T[];
  onDelete?: (id: string | number) => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  showActions?: boolean;
  actions?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
  };
  canNotEdit?: boolean;
  canNotDelete?: boolean;
}

// Pagination interface
export interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageChange?: (page: number) => void;
  showPageNumbers?: boolean;
}

// Search interface
export interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  onSearch?: (term: string) => void;
}

// Table page wrapper interface
export interface TablePageProps<T extends DataProps> {
  title?: string;
  columns: ColumnsProps[];
  data: T[];
  loading?: boolean;
  searchProps?: SearchProps;
  paginationProps?: PaginationProps;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (id: string | number) => void;
  onView?: (item: T) => void;
  addButtonText?: string;
  emptyMessage?: string;
  showActions?: boolean;
  actions?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
  };
}