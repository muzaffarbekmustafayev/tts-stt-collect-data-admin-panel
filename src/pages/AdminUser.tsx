import { useData } from "@/hooks/useData";
import { useState } from "react";
import { adminUsersColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { AdminUser } from "@/types/pageInterfaces";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";

export default function AdminUsers() {
  const { token } = useAuth();
  const { adminUsersData, stats, fetchUsers, loading, currentUser } = useData()
  
  const canNotAdd = currentUser?.role?.toLowerCase() !== 'superadmin'
  const canNotEdit = currentUser?.role?.toLowerCase() !== 'superadmin'
  const canNotDelete = currentUser?.role?.toLowerCase() !== 'superadmin'

  const limit = 20
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<AdminUser | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter data based on search term
  const filteredData = adminUsersData.filter(item => 
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = () => {
    setShowAddForm(true);
  };

  const handleEditUser = (adminUser: AdminUser) => {
    setEditingItem(adminUser);
  };

  const handleSaveUser = (adminUser: AdminUser) => {
    console.log(adminUser);
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

  return (
    <>
      <GenericTablePage<AdminUser>
        title="Admin Users Management"
        columns={adminUsersColumns}
        data={filteredData}
        loading={loading}
        searchProps={{
          searchTerm,
          setSearchTerm: handleSearchUsers,
          placeholder: "Search by username..."
        }}
        paginationProps={{
          currentPage: page,
          total: stats.admins,
          limit,
          onNext: () => setPage(page + 1),
          onPrevious: () => page > 1 && setPage(page - 1)
        }}
        onRefresh={handleRefreshData}
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        addButtonText="Add New Admin User"
        emptyMessage="No admin users found"
        showActions={true}
        actions={{
          edit: true,
          delete: true,
          view: false
        }}
        canNotAdd={canNotAdd}
        canNotEdit={canNotEdit}
        canNotDelete={canNotDelete}
      />

      {editingItem && (
        <GenericEditForm<AdminUser>
          title="Edit Admin User"
          item={editingItem}
          fields={adminUsersColumns as FieldProps[]}
          onSave={handleSaveUser}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {showAddForm && (
        <GenericAddForm<AdminUser>
          title="Add Admin User"
          fields={adminUsersColumns as FieldProps[]}
          onSave={handleSaveUser}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
