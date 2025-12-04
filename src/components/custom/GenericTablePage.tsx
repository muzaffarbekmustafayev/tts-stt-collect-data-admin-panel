import CustomTable from "./CustomTable";
import SearchItem from "./SearchItem";
import FilterItem, { type FilterOption, type FilterState } from "./FilterItem";
import AddItem from "./AddItem";
import TablePage from "./TablePage";
import type { GenericTableProps, DataProps, SearchProps, PaginationProps, FindProps } from "./CustomTable/interfaces";
import { Button } from "../ui/button";
import { Filter, RefreshCcw, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

interface GenericTablePageProps<T extends DataProps> {
  title?: string;
  columns: GenericTableProps<T>["columns"];
  data: T[];
  loading?: boolean;
  searchProps?: SearchProps;
  findProps?: FindProps;
  filterProps?: {
    filters: FilterOption[];
    filterValues: FilterState;
    onFilterChange: (key: string, value: string | number | undefined) => void;
    onClearFilters: () => void;
  };
  paginationProps?: PaginationProps;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (id: string | number) => void;
  onView?: (item: T) => void;
  onRefresh?: () => void;
  addButtonText?: string;
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
  setLimit?: (limit: number) => void;
  limit?: number;
}

export default function GenericTablePage<T extends DataProps>({
  title,
  columns,
  data,
  loading = false,
  searchProps,
  findProps,
  filterProps,
  paginationProps,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onRefresh,
  addButtonText = "Add New",
  emptyMessage = "No data available",
  showActions = true,
  actions = {
    edit: true,
    delete: true,
    view: false
  },
  canNotAdd = false,
  canNotEdit = false,
  canNotDelete = false,
  setLimit,
  limit,
}: GenericTablePageProps<T>) {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="space-y-6 p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{title || "Data Table"}</h1>
        {onRefresh && (
          <Button 
            onClick={onRefresh} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors" 
            variant="outline"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
        )}
      </div>

      {showFilter && filterProps && (
        <FilterItem
          filters={filterProps?.filters || []}
          filterValues={filterProps?.filterValues || {}}
          onFilterChange={filterProps?.onFilterChange || (() => {})}
          onClearFilters={filterProps?.onClearFilters || (() => {})}
          searchTerm={searchProps?.searchTerm || ''}
          setSearchTerm={searchProps?.setSearchTerm || (() => {})}
          placeholder={searchProps?.placeholder || "Filter by..."}
        />
      )}

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 align-middle">
            {filterProps && (
              <Button variant="outline" size="icon" onClick={() => setShowFilter(!showFilter)} className="mt-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
                {showFilter ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
              </Button>
            )}
            {findProps && (
              <div className="flex-1 w-full lg:w-1/3 flex items-center justify-center">
                <SearchItem
                  searchTerm={findProps.findingValue} 
                  setSearchTerm={findProps.setFindingValue} 
                  placeholder={findProps.placeholder || "Find..."} 
                  onFind={findProps.onFind || (() => {})}
                />
              </div>
            )}
          </div>
          
          {onAdd && !canNotAdd && (
            <div className="w-full sm:w-auto">
              <AddItem onClick={onAdd} text={addButtonText} />
            </div>
          )}
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={data}
        loading={loading}
        emptyMessage={emptyMessage}
        showActions={showActions}
        actions={actions}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
        canNotEdit={canNotEdit}
        canNotDelete={canNotDelete}
      />

      <div className="flex justify-end items-center space-x-4">
          {paginationProps && (
            <TablePage 
              currentPage={paginationProps.currentPage} 
              total={paginationProps.total} 
              limit={paginationProps.limit} 
              onNext={paginationProps.onNext} 
              onPrevious={paginationProps.onPrevious} 
            />
          )}
          <Select defaultValue={limit?.toString() || "20"} onValueChange={(value) => setLimit?.(Number(value))}>
            <SelectTrigger className="w-[100px] ml-2 px-1">
              <SelectValue placeholder="Select Page Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Page Limit</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
      </div>
    </div>
  );
}
