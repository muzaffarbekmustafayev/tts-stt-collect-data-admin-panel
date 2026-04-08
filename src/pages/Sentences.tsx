import { useData } from "@/hooks/useData";
import { useCallback, useEffect, useState } from "react";
import { sentencesColumns } from "@/services/tableColumns";
import { useAuth } from "@/hooks/useAuth";
import GenericTablePage from "@/components/custom/GenericTablePage";
import type { Sentence } from "@/types/user";
import GenericEditForm from "@/components/custom/GenericEditForm";
import type { FieldProps } from "@/components/custom/CustomEditForm/interfaces";
import GenericAddForm from "@/components/custom/GenerigAddForm";
import { Button } from "@/components/ui/button";
import { AddSentenceFromFile } from "@/sections/AddSentence";
import { toast } from "sonner";
import { apiService } from "@/services/api";

export default function Sentences() {
  const { token } = useAuth();
  const { sentencesData, stats, fetchSentences, loading } = useData()
  const [limit, setLimit] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [findingValue, setFindingValue] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState<Sentence | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showUploadFile, setShowUploadFile] = useState(false)
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

  const handleSaveSentence = async (sentence: Sentence) => {
    if( !sentence || sentence.text.length <3 ) {
      toast.error('Some fields are not valid');
      return;
    }
    if (!token) return;
    try {
      if (!editingItem) {
        const response = await apiService.addSentence(sentence, token);
        if (response.success) {
          toast.success('Sentence added successfully');
        } else {
          toast.error('Failed to add sentence');
        }
        setShowAddForm(false);
      } else {
        const response = await apiService.updateSentence(sentence, token);
        if (response.success) {
          toast.success('Sentence updated successfully');
        } else {
          toast.error('Failed to update sentence');
        }
        setEditingItem(null);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to save sentence: ' + (error as Error).message);
    }
    fetchSentences(page, limit, token, null);
  };

  const handleDeleteSentence = async (id: string | number) => {
    const confirm = window.confirm('Are you sure you want to delete this sentence?');
    if (!confirm) return;
    if (token) {
      try {
        const response = await apiService.deleteSentence(id, token);
        if (response.success) {
          toast.success('Sentence deleted successfully');
          fetchSentences(page, limit, token, null);
        } else {
          toast.error('Failed to delete sentence');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete sentence:' + (error as Error).message);
      }
    }
  };

  const handleSearchSentences = (term: string) => {
    setSearchTerm(term);
  };

  const findHandler = () => {
    if(!findingValue) return;
    if (token) {
      fetchSentences(page, limit, token, findingValue ? findingValue : null);
    }
  }

  const handleRefreshData = useCallback(() => {
    if (token) {
      fetchSentences(page, limit, token, null);
    }
  }, [token, fetchSentences, page, limit]);
  
  const handleNextPage = () => {
    if (page < Math.ceil(stats.sentences / limit)) {
      if (token) {
        fetchSentences(page + 1, limit, token, null);
      }
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      if (token) {
        fetchSentences(page - 1, limit, token, null);
      }
      setPage(page - 1);
    }
  };

  useEffect(() => {
    handleRefreshData();
  }, [handleRefreshData, limit]);

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setShowUploadFile(true)}>Add Sentence From File</Button>
      </div>
      {
        showUploadFile && (
          <AddSentenceFromFile showUploadFile={showUploadFile} setShowUploadFile={setShowUploadFile}/>
        )
      }
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
        findProps={{
          findingValue: findingValue,
          setFindingValue: setFindingValue,
          placeholder: 'Find by sentence...',
          onFind: findHandler,
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
        setLimit={setLimit}
        limit={limit}
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
