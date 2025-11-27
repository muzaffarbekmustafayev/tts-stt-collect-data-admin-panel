import { useData } from "@/hooks/useData";
import { useCallback, useEffect, useState, useMemo } from "react";
import { usersColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { User } from "@/types/pageInterfaces";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";
import { apiService } from "@/services/api";
import { toast } from "sonner";
import type { FilterState } from "@/components/custom/FilterItem";

export default function Statistics() {
  const { token } = useAuth();
  const { usersData, stats, fetchUsers, loading} = useData()

  const [limit, setLimit] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<User | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterValues, setFilterValues] = useState<FilterState>({})

  // Filter options
  const filterOptions = [
    {
      key: 'gender',
      label: 'Gender',
      type: 'select' as const,
      options: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
      ]
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number' as const,
      placeholder: 'Filter by age'
    }
  ]

  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    return usersData.filter(item => {
      // Search filter
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Gender filter
      const matchesGender = !filterValues.gender || item.gender === filterValues.gender
      
      // Age filter
      const matchesAge = !filterValues.age || item.age === Number(filterValues.age)
      
      return matchesSearch && matchesGender && matchesAge
    })
  }, [usersData, searchTerm, filterValues])

  const handleAddUser = () => {
    setShowAddForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingItem(user);
  };

  const handleSaveUser = async (user: User) => {
    if(!user || !user.name || !user.age || !user.gender) return toast.error('User is not valid');
    try {
      if(user.name.trim() === '' || user.name.length <3 || user.age < 1 || user.age > 100 || user.gender === '-') {
        toast.error('Some fields are not valid');
        return;
      }
      if (!token) return;
      if (!editingItem) {
        const response = await apiService.addUser(user, token);
        if (response.success) {
          toast.success('User added successfully');
        } else {
          toast.error('Failed to add user');
        }
        setShowAddForm(false);
      } else {
        const response = await apiService.updateUser(user, token);
        if (response.success) {
          toast.success('User updated successfully');
        } else {
          toast.error('Failed to update user');
        }
        setEditingItem(null);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save user: ' + (error as Error).message);
    }
    fetchUsers(page, limit, token);
  };

  const handleDeleteUser = async (id: string | number) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;
    if (token) {
      try {
        const response = await apiService.deleteUser(id, token);
        if (response.success) {
          toast.success('User deleted successfully');
          fetchUsers(page, limit, token);
        } else {
          toast.error('Failed to delete user');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete user: ' + (error as Error).message);
      }
    }
  };

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

  const handleRefreshData = useCallback(() => {
    if (token) {
      fetchUsers(page, limit, token);
    }
  }, [token, fetchUsers, page, limit]);
  
  const handleNextPage = () => {
    if (page < Math.ceil(stats.users / limit)) {
      if (token) {
        fetchUsers(page + 1, limit, token);
      }
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      if (token) {
        fetchUsers(page - 1, limit, token);
      }
      setPage(page - 1);
    }
  };

  useEffect(() => {
    handleRefreshData();
  }, [handleRefreshData, limit]);

  return (
    <>
      <GenericTablePage<User>
        title="Users Management"
        columns={usersColumns}
        data={filteredData}
        loading={loading}
        searchProps={{
          searchTerm,
          setSearchTerm: handleSearchUsers,
          placeholder: "Search by name..."
        }}
        filterProps={{
          filters: filterOptions,
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
        onRefresh={handleRefreshData}
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        addButtonText="Add New User"
        emptyMessage="No users found"
        showActions={true}
        actions={{
          edit: true,
          delete: true,
          view: false
        }}
        setLimit={setLimit}
        limit={limit}
      />

      {editingItem && (
        <GenericEditForm<User>
          title="Edit User"
          item={editingItem}
          fields={usersColumns as FieldProps[]}
          onSave={handleSaveUser}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {showAddForm && (
        <GenericAddForm<User>
          title="Add User"
          fields={usersColumns as FieldProps[]}
          onSave={handleSaveUser}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
