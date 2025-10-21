import CustomTable from "./CustomTable";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import TablePage from "./TablePage";
import type { GenericTableProps, DataProps, SearchProps, PaginationProps } from "./CustomTable/interfaces";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface GenericTablePageProps<T extends DataProps> {
  title?: string;
  columns: GenericTableProps<T>["columns"];
  data: T[];
  loading?: boolean;
  searchProps?: SearchProps;
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
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-900">{title || "Data Table"}</h1>
        {onRefresh && (
          <Button onClick={onRefresh} className="bg-blue-500 text-white px-4 py-2 rounded-md" variant="outline">
            <RefreshCcw className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex justify-between items-center space-x-4">
        <div className="flex items-center space-x-4">
          {searchProps && (
            <SearchItem 
              searchTerm={searchProps.searchTerm} 
              setSearchTerm={searchProps.setSearchTerm} 
              placeholder={searchProps.placeholder || "Search..."} 
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
        {onAdd && !canNotAdd && (
          <AddItem onClick={onAdd} text={addButtonText} />
        )}
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
      
      {paginationProps && (
        <TablePage 
          currentPage={paginationProps.currentPage} 
          total={paginationProps.total} 
          limit={paginationProps.limit} 
          onNext={paginationProps.onNext} 
          onPrevious={paginationProps.onPrevious} 
        />
      )}
    </div>
  );
}
