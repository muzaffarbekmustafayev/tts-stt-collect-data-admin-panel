import { useData } from "@/hooks/useData";
import { useState } from "react";
import { adminUsersColumns, adminUsersColumnsUpdate } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { AdminUser } from "@/types/pageInterfaces";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";
import { toast } from "sonner";
import { apiService } from "@/services/api";

export default function AdminUsers() {
  const { token } = useAuth();
  const { adminUsersData, stats, fetchAdminUsers, loading, currentUser } = useData()
  const canNotAdd = currentUser?.role?.toLowerCase() !== 'superadmin'
  const canNotEdit = currentUser?.role?.toLowerCase() !== 'superadmin'
  const canNotDelete = currentUser?.role?.toLowerCase() !== 'superadmin'

  const limit = 20
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<AdminUser | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  
  // Filter data based on search term
  const filteredData = adminUsersData?.filter(item => 
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAdminUser = () => {
    setShowAddForm(true);
  };

  const handleEditAdminUser = (adminUser: AdminUser) => {
    setEditingItem(adminUser);
  };

  const handleSaveAdminUser = async (adminUser: AdminUser) => {
    console.log(adminUser);
    if(!adminUser || !adminUser.username) return toast.error('Admin is not valid');
    try {
      if(adminUser.username.trim() === '' || adminUser.username.length <3 || adminUser.role === '-') {
        toast.error('Some fields are not valid');
        return;
      }
      if (!token) return;
      if (!editingItem) {
        const response = await apiService.addAdminUser(adminUser, token);
        if (response.success) {
          toast.success('Admin user added successfully');
        } else {
          toast.error('Failed to add admin user');
        }
        setShowAddForm(false);
      } else {
        const response = await apiService.updateAdminUser(adminUser, token);
        if (response.success) {
          toast.success('Admin user updated successfully');
        } else {
          toast.error('Failed to update admin user');
        }
        setEditingItem(null);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save admin : ' + (error as Error).message);
    }
    fetchAdminUsers(page, limit, token);
  };

  const handleDeleteAdminUser = async (id: string | number) => {
    const confirm = window.confirm('Are you sure you want to delete this Admin?');
    if (!confirm) return;
    if (token) {
      try {
        const response = await apiService.deleteAdminUser(id, token);
        if (response.success) {
          toast.success('Admin user deleted successfully');
          fetchAdminUsers(page, limit, token);
        } else {
          toast.error('Failed to delete admin user');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete admin user:' + (error as Error).message);
      }
    }
  };

  const handleSearchAdminUsers = (term: string) => {
    setSearchTerm(term);
  };

  const handleRefreshData = () => {
    if (token) {
      fetchAdminUsers(page, limit, token);
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
          setSearchTerm: handleSearchAdminUsers,
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
        onAdd={handleAddAdminUser}
        onEdit={handleEditAdminUser}
        onDelete={handleDeleteAdminUser}
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
          fields={adminUsersColumnsUpdate as FieldProps[]}
          onSave={handleSaveAdminUser}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {showAddForm && (
        <GenericAddForm<AdminUser>
          title="Add Admin User"
          fields={adminUsersColumns as FieldProps[]}
          onSave={handleSaveAdminUser}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
