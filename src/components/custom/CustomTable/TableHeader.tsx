import { ChevronUp, ChevronDown } from 'lucide-react';
import type { TableHeaderProps } from "./interfaces";

export default function TableHeader({ 
  columns, 
  onSort, 
  sortColumn, 
  sortDirection,
  showActions = true,
  canNotEdit = false,
  canNotDelete = false
}: TableHeaderProps) {
  const handleSort = (key: string) => {
    if (onSort) {
      onSort(key);
    }
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map(col => (
          <th 
            key={col.key} 
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col?.width || ''} ${
              col.sortable && onSort ? 'cursor-pointer hover:bg-gray-100' : ''
            }`}
            onClick={() => col.sortable && handleSort(col.key)}
          >
            <div className="flex items-center space-x-1">
              <span>{col.label}</span>
              {col.sortable && sortColumn === col.key && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </span>
              )}
            </div>
          </th>
        ))}
        {showActions && !canNotEdit && !canNotDelete && (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
}
