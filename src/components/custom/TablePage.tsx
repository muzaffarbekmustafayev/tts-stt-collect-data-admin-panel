import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "../ui/button";

interface TablePageProps {
  currentPage: number;
  total: number;
  limit: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function TablePage({ currentPage = 0, total = 0, limit = 0, onNext, onPrevious }: TablePageProps) {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);
  return (
    <Pagination>
        <PaginationContent>
          <PaginationItem className={`bg-secundary border rounded-sm shadow ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <PaginationPrevious onClick={onPrevious} />
          </PaginationItem>
          <Button variant="outline" className="bg-transparent border-none shadow-none">
              {start} - {end}  of {total}
          </Button>
          <PaginationItem className={`bg-secundary border rounded-sm shadow ${currentPage === Math.ceil(total / limit) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <PaginationNext onClick={onNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}
