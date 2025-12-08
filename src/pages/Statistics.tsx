import { useData } from "@/hooks/useData";
import { useCallback, useEffect, useState, useMemo } from "react";
import { userStatisticsColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { UserStatistics } from "@/types/pageInterfaces";
import type { FilterState } from "@/components/custom/FilterItem";
import { utils, writeFile } from 'xlsx';

export default function Statistics() {
  const { token } = useAuth();
  const { userStatisticsData, stats, fetchUserStatistics, loading, getUserStatisticsToDownload} = useData()

  const [limit, setLimit] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [findingValue, setFindingValue] = useState('')
  const [page, setPage] = useState(1)
  const [filterValues, setFilterValues] = useState<FilterState>({})

  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    return userStatisticsData.filter(item => {
      // Search filter
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [userStatisticsData, searchTerm])


  const handleSearchUsers = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (key: string, value: string | number | undefined) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleClearFilters = () => {
    setFilterValues({})
  }

  const findHandler = () => {
    if(!findingValue) return;
    if (token) {
      fetchUserStatistics(page, limit, token, findingValue ? findingValue : null);
    }
  }

  const handleRefreshData = useCallback(() => {
    if (token) {
      fetchUserStatistics(page, limit, token, null);
    }
  }, [token, fetchUserStatistics, page, limit]);
  
  const handleNextPage = () => {
    if (page < Math.ceil(stats.users / limit)) {
      if (token) {
        fetchUserStatistics(page + 1, limit, token, findingValue ? findingValue : null);
      }
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      if (token) {
        fetchUserStatistics(page - 1, limit, token, findingValue ? findingValue : null);
      }
      setPage(page - 1);
    }
  };

  const downloadStatisticsXLSX = async () => {
    const dataToDownload = await getUserStatisticsToDownload();
    if (!dataToDownload) return;

    const ws = utils.json_to_sheet(dataToDownload);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, "statistics.xlsx");
  };

  useEffect(() => {
    handleRefreshData();
  }, [handleRefreshData, limit]);

  return (
    <>
      <GenericTablePage<UserStatistics>
        title="User Statistics"
        columns={userStatisticsColumns}
        data={filteredData}
        loading={loading}
        searchProps={{
          searchTerm,
          setSearchTerm: handleSearchUsers,
          placeholder: "Search by name..."
        }}
        findProps={{
          findingValue: findingValue,
          setFindingValue: setFindingValue,
          placeholder: 'Find by name...',
          onFind: findHandler,
        }}
        filterProps={{
          filters: [],
          filterValues,
          onFilterChange: handleFilterChange,
          onClearFilters: handleClearFilters
        }}
        paginationProps={{
          currentPage: page,
          total: stats.users,
          limit,
          onNext: handleNextPage,
          onPrevious: handlePreviousPage
        }}
        isEnabledExport={true}
        onDownload={downloadStatisticsXLSX}
        onRefresh={handleRefreshData}
        showActions={false}
        addButtonText="No action"
        emptyMessage="No user statistics found"
        setLimit={setLimit}
        limit={limit}
      />
    </>
  );
}
