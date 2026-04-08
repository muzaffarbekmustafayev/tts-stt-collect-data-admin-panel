import { useData } from "@/hooks/useData";
import { useCallback, useEffect, useState } from "react";
import { audiosColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { Audio } from "@/types/user";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";
import { apiService } from "@/services/api";
import { toast } from "sonner";

export default function Audios() {
  const { token } = useAuth();
  const { audiosData, stats, fetchAudios, loading } = useData()

  const [limit, setLimit] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<Audio | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter data based on search term
  const filteredData = audiosData.filter(item => 
    item.sentence?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAudio = () => {
    return toast.error('Add audio is not allowed');
    setShowAddForm(true);
  };

  const handleEditAudio = (audio: Audio) => {
    setEditingItem(audio);
  };

  const handleSaveAudio = async (audio: Audio) => {
    if(!audio || !audio.user_id || !audio.sentence_id || !audio.audio_path) return toast.error('Audio is not valid');
    try {
      if(!audio.user_id || !audio.sentence_id || audio.audio_path === '-') {
        toast.error('Some fields are not valid');
        return;
      }
      if (!token) return;
      if (!editingItem) {
        const response = await apiService.addAudio(audio, token);
        if (response?.success) {
          toast.success('Audio added successfully');
        } else {
          toast.error('Failed to add audio');
        }
        setShowAddForm(false);
      } else {
        const response = await apiService.updateAudio(audio, token);
        if (response.success) {
          toast.success('Audio updated successfully');
        } else {
          toast.error('Failed to update audio');
        }
        setEditingItem(null);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save audio: ' + (error as Error).message);
    }
    fetchAudios(page, limit, token);
  };

  const handleDeleteAudio = async (id: string | number) => {
    const confirm = window.confirm('Are you sure you want to delete this Audio?');
    if (!confirm) return;
    if (token) {
      try {
        const response = await apiService.deleteAudio(id, token);
        if (response.success) {
          toast.success('Audio deleted successfully');
          fetchAudios(page, limit, token);
        } else {
          toast.error('Failed to delete audio');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete audio: ' + (error as Error).message);
      }
    }
  };

  const handleSearchAudios = (term: string) => {
    setSearchTerm(term);
  };

  const handleRefreshData = useCallback(() => {
    if (token) {
      fetchAudios(page, limit, token);
    }
  }, [token, fetchAudios, page, limit]);
  
  const handleNextPage = () => {
    if (page < Math.ceil((stats.audios as unknown as number) / limit)) {
      if (token) {
        fetchAudios(page + 1, limit, token);
      }
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      if (token) {
        fetchAudios(page - 1, limit, token);
      }
      setPage(page - 1);
    }
  };

  useEffect(() => {
    handleRefreshData();
  }, [handleRefreshData, limit]);

  return (
    <>
      <GenericTablePage<Audio>
        title="Audios Management"
        columns={audiosColumns}
        data={filteredData}
        loading={loading}
        searchProps={{
          searchTerm,
          setSearchTerm: handleSearchAudios,
          placeholder: "Search by sentence..."
        }}
        paginationProps={{
          currentPage: page,
          total: stats.audios as unknown as number,
          limit,
          onNext: handleNextPage,
          onPrevious: handlePreviousPage
        }}
        onRefresh={handleRefreshData}
        onAdd={handleAddAudio}
        onEdit={handleEditAudio}
        onDelete={handleDeleteAudio}
        addButtonText="Add New Audio"
        emptyMessage="No audios found"
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
        <GenericEditForm<Audio>
          title="Edit Audio"
          item={editingItem}
          fields={audiosColumns as FieldProps[]}
          onSave={handleSaveAudio}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {showAddForm && (
        <GenericAddForm<Audio>
          title="Add Audio"
          fields={audiosColumns as FieldProps[]}
          onSave={handleSaveAudio}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
