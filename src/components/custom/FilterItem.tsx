import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export interface FilterOption {
  key: string
  label: string
  type: 'select' | 'text' | 'number'
  options?: { label: string; value: string }[]
  placeholder?: string
}

export interface FilterState {
  [key: string]: string | number | undefined
}

interface FilterItemProps {
  filters: FilterOption[]
  filterValues: FilterState
  onFilterChange: (key: string, value: string | number | undefined) => void
  onClearFilters: () => void
  placeholder?: string
  searchTerm: string
  setSearchTerm: (value: string) => void
}

export default function FilterItem({ 
  filters, 
  filterValues, 
  onFilterChange, 
  onClearFilters,
  placeholder= "Filter by...",
  searchTerm,
  setSearchTerm,
}: FilterItemProps) {
  const activeFiltersCount = Object.values(filterValues).filter(
    (value) => value !== undefined && value !== '' && value !== null
  ).length

  const hasActiveFilters = activeFiltersCount > 0

  return (
    <div className="flex items-center gap-3 flex-wrap transition-all duration-300">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filter:</span>
      </div>
      <input
          type="search"
          name="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-400"
        />

      {filters.map((filter) => (
        <div key={filter.key} className="flex items-center gap-2">
          {filter.type === 'select' && filter.options ? (
            <Select
              value={filterValues[filter.key]?.toString() || ''}
              onValueChange={(value) => 
                onFilterChange(filter.key, value === 'all' ? undefined : value)
              }
            >
              <SelectTrigger className="w-[150px] h-9 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder={filter.placeholder || `Select ${filter.label}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{filter.label}</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : filter.type === 'text' ? (
            <input
              type="text"
              placeholder={filter.placeholder || `Filter by ${filter.label}`}
              value={filterValues[filter.key]?.toString() || ''}
              onChange={(e) => 
                onFilterChange(filter.key, e.target.value || undefined)
              }
              className="h-9 px-3 w-[150px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          ) : filter.type === 'number' ? (
            <input
              type="number"
              placeholder={filter.placeholder || `Filter by ${filter.label}`}
              value={filterValues[filter.key]?.toString() || ''}
              onChange={(e) => 
                onFilterChange(filter.key, e.target.value ? Number(e.target.value) : undefined)
              }
              className="h-9 px-3 w-[150px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          ) : null}
        </div>
      ))}

      {hasActiveFilters && (
        <>
          <Badge 
            variant="secondary" 
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
          >
            {activeFiltersCount} active
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-9 px-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </>
      )}
    </div>
  )
}

