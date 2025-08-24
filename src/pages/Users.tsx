import { useData } from "@/hooks/useData";
import { useState } from "react";
import { usersColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { User } from "@/types/pageInterfaces";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";

export default function Users() {
  const { token } = useAuth();
  const { usersData, stats, fetchUsers, loading } = useData()

  const limit = 10
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<User | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter data based on search term
  const filteredData = usersData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = () => {
    setShowAddForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingItem(user);
  };

  const handleSaveUser = (user: User) => {
    console.log(user);
    setEditingItem(null);
    // TODO: Implement refresh data logic
  };

  const handleDeleteUser = (id: string | number) => {
    // Implement delete logic here
    console.log('Delete user with id:', id);
  };

  const handleSearchUsers = (term: string) => {
    setSearchTerm(term);
  };

  const handleRefreshData = () => {
    if (token) {
      fetchUsers(page, limit, token);
    }
  };
  
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
