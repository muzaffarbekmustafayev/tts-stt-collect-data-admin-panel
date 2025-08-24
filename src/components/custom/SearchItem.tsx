import { Search } from "lucide-react"

interface SearchItemProps {
  searchTerm: string
  placeholder?: string
  setSearchTerm: (value: string) => void
}

export default function SearchItem({ searchTerm, setSearchTerm, placeholder = 'Search...' }: SearchItemProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  )
}
