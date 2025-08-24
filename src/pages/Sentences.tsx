import { useData } from "@/hooks/useData";
import { useState } from "react";
import { sentencesColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { Sentence } from "@/types/pageInterfaces";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";

export default function Sentences() {
  const { token } = useAuth();
  const { sentencesData, stats, fetchSentences, loading } = useData()

  const limit = 10
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<Sentence | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter data based on search term
  const filteredData = sentencesData.filter(item => 
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddSentence = () => {
    setShowAddForm(true);
  };

  const handleEditSentence = (sentence: Sentence) => {
    setEditingItem(sentence);
  };

  const handleSaveSentence = (sentence: Sentence) => {
    console.log(sentence);
    setEditingItem(null);
    // TODO: Implement refresh data logic
  };

  const handleDeleteSentence = (id: string | number) => {
    // Implement delete logic here
    console.log('Delete sentence with id:', id);
  };

  const handleSearchSentences = (term: string) => {
    setSearchTerm(term);
  };

  const handleRefreshData = () => {
    if (token) {
      fetchSentences(page, limit, token);
    }
  };
  
  const handleNextPage = () => {
    if (page < Math.ceil(stats.sentences / limit)) {
      if (token) {
        fetchSentences(page + 1, limit, token);
      }
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      if (token) {
        fetchSentences(page - 1, limit, token);
      }
      setPage(page - 1);
    }
  };

  return (
    <>
      <GenericTablePage<Sentence>
        title="Sentences Management"
        columns={sentencesColumns}
        data={filteredData}
        loading={loading}
        searchProps={{
          searchTerm,
          setSearchTerm: handleSearchSentences,
          placeholder: "Search by sentence..."
        }}
        paginationProps={{
          currentPage: page,
          total: stats.sentences,
          limit,
          onNext: handleNextPage,
          onPrevious: handlePreviousPage
        }}
        onRefresh={handleRefreshData}
        onAdd={handleAddSentence}
        onEdit={handleEditSentence}
        onDelete={handleDeleteSentence}
        addButtonText="Add New Sentence"
        emptyMessage="No sentences found"
        showActions={true}
        actions={{
          edit: true,
          delete: true,
          view: false
        }}
      />

      {editingItem && (
        <GenericEditForm<Sentence>
          title="Edit Sentence"
          item={editingItem}
          fields={sentencesColumns as FieldProps[]}
          onSave={handleSaveSentence}
          onCancel={() => setEditingItem(null)}
        />
      )}

      {showAddForm && (
        <GenericAddForm<Sentence>
          title="Add Sentence"
          fields={sentencesColumns as FieldProps[]}
          onSave={handleSaveSentence}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );
}
