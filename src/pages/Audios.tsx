import { useData } from "@/hooks/useData";
import { useState } from "react";
import { audiosColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { Audio } from "@/types/user";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";

export default function Audios() {
  const { token } = useAuth();
  const { audiosData, stats, fetchAudios, loading } = useData()

  const limit = 20
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<Audio | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter data based on search term
  const filteredData = audiosData.filter(item => 
    item.sentence?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAudio = () => {
    setShowAddForm(true);
  };

  const handleEditAudio = (audio: Audio) => {
    setEditingItem(audio);
  };

  const handleSaveAudio = (audio: Audio) => {
    console.log(audio);
    setEditingItem(null);
    // TODO: Implement refresh data logic
  };

  const handleDeleteAudio = (id: string | number) => {
    // Implement delete logic here
    console.log('Delete audio with id:', id);
  };

  const handleSearchAudios = (term: string) => {
    setSearchTerm(term);
  };

  const handleRefreshData = () => {
    if (token) {
      fetchAudios(page, limit, token);
    }
  };
  
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
