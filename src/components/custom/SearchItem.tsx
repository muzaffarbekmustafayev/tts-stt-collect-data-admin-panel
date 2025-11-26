import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchItemProps {
  searchTerm: string
  placeholder?: string
  setSearchTerm: (value: string) => void
}

export default function SearchItem({ searchTerm, setSearchTerm, placeholder = 'Search...' }: SearchItemProps) {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <input
          type="search"
          name="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 py-2.5 w-full md:w-[400px] lg:w-[500px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder:text-gray-400 shadow-sm hover:border-gray-400"
        />
        <Button variant="default" className="ml-2 py-2 px-4 rounded-lg align-middle">
          <Search className="w-4 h-4" />
          <span className="hidden md:block">Search</span>
        </Button>
      </div>
    </div>
  )
}
