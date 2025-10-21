import { useData } from "@/hooks/useData";
import { useCallback, useEffect, useState } from "react";
import { checkedAudiosColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { CheckedAudio } from "@/types/user";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";
import { toast } from "sonner";
import { apiService } from "@/services/api";

export default function CheckedAudios() {
  const { token } = useAuth();
  const { checkedAudiosData, stats, fetchCheckedAudios, loading } = useData()
  
  const [limit, setLimit] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<CheckedAudio | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter data based on search term
  const filteredData = checkedAudiosData.filter(item => 
    item.id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCheckedAudio = () => {
    return toast.error('Add checked audio is not allowed');
    setShowAddForm(true);
  };

  const handleEditCheckedAudio = (audio: CheckedAudio) => {
    setEditingItem(audio);
  };

  const handleSaveCheckedAudio = async (checkedAudio: CheckedAudio) => {
    console.log(checkedAudio);
    
    if(!checkedAudio) return toast.error('Checked Audio is not valid');
    try {
      if(!checkedAudio.checked_by || !checkedAudio.audio_id || !checkedAudio.status || checkedAudio.is_correct === null) {
        toast.error('Some fields are not valid');
        return;
      }
      if (!token) return;
      if (!editingItem) {
        const response = await apiService.addCheckedAudio(checkedAudio, token);
        if (response?.success) {
          toast.success('Checked Audio added successfully');
        } else {
          toast.error('Failed to add checked audio');
        }
        setShowAddForm(false);
      } else {
        const response = await apiService.updateCheckedAudio(checkedAudio, token);
        if (response.success) {
          toast.success('Checked Audio updated successfully');
        } else {
          toast.error('Failed to update checked audio');
        }
        setEditingItem(null);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save checked audio: ' + (error as Error).message);
    }
    fetchCheckedAudios(page, limit, token);
  };

  const handleDeleteCheckedAudio = async (id: string | number) => {
    const confirm = window.confirm('Are you sure you want to delete this Checked Audio?');
    if (!confirm) return;
    if (token) {
      try {
        const response = await apiService.deleteCheckedAudio(id, token);
        if (response.success) {
          toast.success('Checked Audio deleted successfully');
          fetchCheckedAudios(page, limit, token);
        } else {
          toast.error('Failed to delete checked audio');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete checked audio:' + (error as Error).message);
      }
    }
  };

  const handleSearchCheckedAudios = (term: string) => {
    setSearchTerm(term);
  };

  const handleRefreshData = useCallback(() => {
    if (token) {
      fetchCheckedAudios(page, limit, token);
    }
  }, [token, fetchCheckedAudios, page, limit]);
  
  const handleNextPage = () => {
    if (page < Math.ceil((stats.audios as unknown as number) / limit)) {
      if (token) {
        fetchCheckedAudios(page + 1, limit, token);
      }
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      if (token) {
        fetchCheckedAudios(page - 1, limit, token);
      }
      setPage(page - 1);
    }
  };

  useEffect(() => {
    handleRefreshData();
  }, [handleRefreshData, limit]);

  return (
    <>
      <GenericTablePage<CheckedAudio>
        title="Checked Audios"
        columns={checkedAudiosColumns}
        data={filteredData}
        loading={loading}
        searchProps={{
          searchTerm,
          setSearchTerm: handleSearchCheckedAudios,
          placeholder: "Search by sentence..."
        }}
        paginationProps={{
          currentPage: page,
          total: stats.checked_audios as unknown as number,
          limit,
          onNext: handleNextPage,
          onPrevious: handlePreviousPage
        }}
        onRefresh={handleRefreshData}
        onAdd={handleAddCheckedAudio}
        onEdit={handleEditCheckedAudio}
        onDelete={handleDeleteCheckedAudio}
        addButtonText="Add New Checked Audio"
        emptyMessage="No checked audios found"
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
        <GenericEditForm<CheckedAudio>
          title="Edit Checked Audio"
          item={editingItem}
          fields={checkedAudiosColumns as FieldProps[]}
          onSave={handleSaveCheckedAudio}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {showAddForm && (
        <GenericAddForm<CheckedAudio>
          title="Add Checked Audio"
          fields={checkedAudiosColumns as FieldProps[]}
          onSave={handleSaveCheckedAudio}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
